import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnswerSubmissionModel() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const [questionError, setQuestionError] = useState(null);

  // Changed to timeRemainingSeconds to reflect its purpose
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalDurationSeconds, setTotalDurationSeconds] = useState(0); // New state for total duration

  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Indicates if user has already submitted for THIS question
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  const timerIntervalRef = useRef(null); // Ref to hold the interval ID

  // Base URL for your backend API
  const API_BASE_URL = "http://localhost:5000/api";

  // --- Utility function to format time ---
  // Using useCallback for memoization as it's a utility function
  const formatTime = useCallback((totalSeconds) => {
    if (totalSeconds < 0) totalSeconds = 0; // Ensure time doesn't go negative on display
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []); // No dependencies, so it's stable

  // --- Timer Logic (useEffect to run every second) ---
  useEffect(() => {
    // Only run if an active question and its total duration are available
    if (activeQuestion && totalDurationSeconds > 0) {
      // Clear any existing timer first to prevent multiple intervals
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }

      timerIntervalRef.current = setInterval(() => {
        const now = new Date().getTime(); // Current client-side time in milliseconds
        const questionStartTime = new Date(activeQuestion.startTime).getTime(); // Question's start time in milliseconds

        // Calculate the absolute end time of the question's duration
        const endTime = questionStartTime + totalDurationSeconds * 1000;

        // Calculate remaining seconds
        const remaining = Math.max(0, Math.floor((endTime - now) / 1000));

        setTimeRemainingSeconds(remaining); // Update the state for display

        // Calculate progress for the progress bar
        setProgress(
          ((totalDurationSeconds - remaining) / totalDurationSeconds) * 100
        );

        // If time runs out
        if (remaining <= 0) {
          clearInterval(timerIntervalRef.current); // Stop the timer
          // If the user hasn't submitted and the time is up, alert them
          if (!isSubmitted && !isSubmitting) {
            alert(
              "Time's up! The submission period for this question has ended."
            );
            // Optionally, you could automatically trigger a submission here if desired,
            // or just disable further input/submission.
          }
        }
      }, 1000); // Update every second
    }

    // Cleanup function: Clear interval when component unmounts or dependencies change
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [activeQuestion, totalDurationSeconds, isSubmitted, isSubmitting]); // Dependencies: activeQuestion (for startTime/duration), totalDuration, and submission states

  // --- Fetch Active Daily Question ---
  useEffect(() => {
    const fetchActiveQuestion = async () => {
      setLoadingQuestion(true);
      setQuestionError(null);
      try {
        const token = localStorage.getItem("token"); // Assuming user token is stored

        if (!token) {
          setQuestionError(
            "User not logged in. Please log in to get the daily question."
          );
          setLoadingQuestion(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/daily-questions/active`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch active question"
          );
        }

        const data = await response.json();

        // Handle case where user has already submitted for this question
        if (data.submitted) {
          setIsSubmitted(true); // Mark as submitted
          setAnswer(data.yourSubmission?.answer_text || ""); // Display their previous answer
          // Keep the question data to show duration/start time for context
          setActiveQuestion(data.question);
          setTotalDurationSeconds(data.question.duration * 60);
          setQuestionError(
            "You have already submitted an answer for today's question."
          );
          return; // Exit as user can't submit again
        }

        setActiveQuestion(data.question);
        if (
          data.question &&
          data.question.duration &&
          data.question.startTime
        ) {
          const durationInSeconds = data.question.duration * 60;
          setTotalDurationSeconds(durationInSeconds);

          const now = new Date().getTime();
          const questionStartTime = new Date(data.question.startTime).getTime();
          const endTime = questionStartTime + durationInSeconds * 1000;
          const initialRemaining = Math.max(
            0,
            Math.floor((endTime - now) / 1000)
          );

          setTimeRemainingSeconds(initialRemaining);
          // Set initial progress based on how much time has already passed
          setProgress(
            ((durationInSeconds - initialRemaining) / durationInSeconds) * 100
          );

          // If time is already up when fetching
          if (initialRemaining <= 0) {
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
            }
            alert(
              "Time's up! The submission period for this question has ended."
            );
            // Disable input if time is already over
            setIsSubmitted(true); // Treat as if submitted to disable form
          }
        } else {
          setQuestionError(
            "Active question found, but missing duration or start time details."
          );
        }
      } catch (error) {
        console.error("Error fetching active question:", error);
        setQuestionError(error.message);
      } finally {
        setLoadingQuestion(false);
      }
    };

    fetchActiveQuestion();

    // No specific cleanup needed here, the other useEffect for the timer handles its own cleanup.
  }, []); // Runs once on component mount

  // Effect to update character count whenever the answer changes
  useEffect(() => {
    setCharacterCount(answer.length);
  }, [answer]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    // Prevent submission if no active question, time is up, or input is invalid/already submitting
    if (!activeQuestion || timeRemainingSeconds <= 0) {
      alert("Cannot submit: Question not loaded or time has run out.");
      return;
    }
    if (!answer.trim()) {
      alert("Please enter an answer before submitting.");
      return;
    }
    if (isSubmitting || isSubmitted) {
      return; // Prevent multiple clicks
    }
    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    setIsSubmitting(true);
    setShowConfirmation(false);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in to submit your answer.");
      setIsSubmitting(false);
      return;
    }

    if (!activeQuestion) {
      alert("No active question found to submit against.");
      setIsSubmitting(false);
      return;
    }

    // Additional client-side check if time has run out just before submitting
    if (timeRemainingSeconds <= 0) {
      alert("Submission failed: Time has run out.");
      setIsSubmitting(false);
      setIsSubmitted(true); // Disable further attempts
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/daily-questions/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          daily_question_id: activeQuestion._id,
          answer_text: answer,
          // time_taken_seconds is no longer sent here as per your previous request
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit answer");
      }

      const data = await response.json();
      console.log("Submission successful:", data);

      setIsSubmitting(false);
      setIsSubmitted(true); // Mark as submitted for this session
      // Stop the timer on successful submission
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }

      // Reset after showing success message
      setTimeout(() => {
        setAnswer(""); // Clear the answer input
        // You might want to reload the page or navigate away here to show the next daily question or a "submitted" state.
        // For now, we'll keep it as submitted and disabled.
      }, 3000);
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert(`Error submitting answer: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  const cancelSubmit = () => {
    setShowConfirmation(false);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "clamp(10px, 2vw, 20px)",
      borderRadius: "20px",
      minHeight: "clamp(400px, 80vh, 650px)",
      background: "#F8F8F8",
      width: "100%",
      boxSizing: "border-box",
      overflow: "hidden",
    },
    questionBox: {
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "25px",
      marginBottom: "20px",
      color: "#555",
      fontSize: "25px",
      lineHeight: "1.5",
      backgroundColor: "#ffffff",
      minHeight: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    answerSection: {
      marginBottom: "20px",
    },
    answerLabel: {
      display: "block",
      marginBottom: "10px",
      fontSize: "18px",
      color: "#555",
      fontWeight: "500",
    },
    answerInput: {
      width: "100%",
      minHeight: "150px",
      padding: "15px",
      border: "2px solid #e0e0e0",
      borderRadius: "15px",
      fontSize: "16px",
      fontFamily: "monospace",
      resize: "vertical",
      outline: "none",
      backgroundColor: "#ffffff",
      transition: "border-color 0.3s ease",
      boxSizing: "border-box",
    },
    answerInputFocused: {
      borderColor: "#ff9d76",
    },
    characterCounter: {
      textAlign: "right",
      marginTop: "5px",
      fontSize: "14px",
      color: "#888",
    },
    timerContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px 0",
    },
    timer: {
      fontSize: "60px",
      fontWeight: "300",
      color: "#ff9d76",
      margin: "10px 0",
    },
    progressBarContainer: {
      width: "100%",
      maxWidth: "400px",
      position: "relative",
      marginTop: "10px",
    },
    progressBar: {
      height: "4px",
      width: "100%",
      background: "#e0e0e0",
      borderRadius: "2px",
    },
    // The `width` of this style will be overridden by inline style based on `progress` state
    progress: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "4px",
      background: "#ff9d76",
      transition: "width 1s linear",
      borderRadius: "2px",
    },
    buttonContainer: {
      display: "flex",
      gap: "15px",
      marginTop: "20px",
      justifyContent: "center",
    },
    button: {
      padding: "12px 30px",
      border: "1px solid #ccc",
      borderRadius: "50px",
      background: "white",
      fontSize: "18px",
      color: "#555",
      cursor: "pointer",
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
    },
    buttonDisabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    confirmationModal: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    confirmationBox: {
      background: "white",
      padding: "30px",
      borderRadius: "20px",
      maxWidth: "400px",
      width: "90%",
      textAlign: "center",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    },
    confirmationTitle: {
      fontSize: "24px",
      marginBottom: "15px",
      color: "#333",
    },
    confirmationText: {
      fontSize: "16px",
      marginBottom: "25px",
      color: "#666",
      lineHeight: "1.5",
    },
    confirmationButtons: {
      display: "flex",
      gap: "15px",
      justifyContent: "center",
    },
    confirmButton: {
      padding: "10px 25px",
      border: "none",
      borderRadius: "25px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    confirmButtonPrimary: {
      background: "#ff9d76",
      color: "white",
    },
    confirmButtonSecondary: {
      background: "#f5f5f5",
      color: "#666",
    },
    successMessage: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#4CAF50",
      color: "white",
      padding: "20px 30px",
      borderRadius: "15px",
      fontSize: "18px",
      zIndex: 1001,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    },
    loadingSpinner: {
      display: "inline-block",
      width: "20px",
      height: "20px",
      border: "3px solid #f3f3f3",
      borderTop: "3px solid #ff9d76",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginRight: "10px",
    },
  };

  const spinKeyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{spinKeyframes}</style>
      <div style={styles.container}>
        <div style={styles.questionBox}>
          {loadingQuestion ? (
            <p>Loading daily question...</p>
          ) : questionError ? (
            <p style={{ color: "red" }}>Error: {questionError}</p>
          ) : activeQuestion ? (
            <p>{activeQuestion.question_text}</p>
          ) : (
            <p>
              No active daily question available at the moment. Please check
              back later!
            </p>
          )}
        </div>

        <div style={styles.timerContainer}>
          <div style={styles.progressBarContainer}>
            <div style={styles.progressBar}></div>
            {/* Inline style for dynamic width based on progress */}
            <div style={{ ...styles.progress, width: `${progress}%` }}></div>
          </div>
          <div style={styles.timer}>
            {activeQuestion ? formatTime(timeRemainingSeconds) : "0:00"}
          </div>
          {activeQuestion && (
            <p style={{ fontSize: "14px", color: "#888" }}>
              Time Limit: {activeQuestion.duration} minutes
            </p>
          )}
        </div>

        <div style={styles.answerSection}>
          <label style={styles.answerLabel}>Your Answer:</label>
          <textarea
            style={{
              ...styles.answerInput,
              ...(answer && styles.answerInputFocused),
            }}
            value={answer}
            onChange={handleAnswerChange}
            placeholder="Enter your JavaScript code here..."
            // Disable if no active question, submitting, already submitted, or time has run out
            disabled={
              !activeQuestion ||
              isSubmitting ||
              isSubmitted ||
              timeRemainingSeconds <= 0
            }
          />
          <div style={styles.characterCounter}>{characterCount} characters</div>
        </div>

        <div style={styles.buttonContainer}>
          <motion.button
            style={{
              ...styles.button,
              // Apply disabled style if any of the conditions are met
              ...((!activeQuestion ||
                !answer.trim() ||
                isSubmitting ||
                isSubmitted ||
                timeRemainingSeconds <= 0) &&
                styles.buttonDisabled),
            }}
            // Hover and tap effects only if button is not disabled
            whileHover={
              !activeQuestion ||
              !answer.trim() ||
              isSubmitting ||
              isSubmitted ||
              timeRemainingSeconds <= 0
                ? {} // No hover effect if disabled
                : {
                    scale: 1.05,
                    backgroundColor: "#ff9d76",
                    color: "white",
                  }
            }
            whileTap={
              !activeQuestion ||
              !answer.trim() ||
              isSubmitting ||
              isSubmitted ||
              timeRemainingSeconds <= 0
                ? {} // No tap effect if disabled
                : { scale: 0.95 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onClick={handleSubmit}
            // Actual disabled prop for browser handling
            disabled={
              !activeQuestion ||
              !answer.trim() ||
              isSubmitting ||
              isSubmitted ||
              timeRemainingSeconds <= 0
            }
          >
            {isSubmitting && <div style={styles.loadingSpinner}></div>}
            {isSubmitting
              ? "Submitting..."
              : isSubmitted
              ? "Answer Submitted!"
              : "Submit Answer"}
          </motion.button>
        </div>

        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              style={styles.confirmationModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                style={styles.confirmationBox}
                initial={{ scale: 0.8, y: -50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: -50 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <h3 style={styles.confirmationTitle}>Submit Answer?</h3>
                <p style={styles.confirmationText}>
                  Are you sure you want to submit your answer? You won't be able
                  to edit it after submission.
                </p>
                <div style={styles.confirmationButtons}>
                  <motion.button
                    style={{
                      ...styles.confirmButton,
                      ...styles.confirmButtonPrimary,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmSubmit}
                  >
                    Yes, Submit
                  </motion.button>
                  <motion.button
                    style={{
                      ...styles.confirmButton,
                      ...styles.confirmButtonSecondary,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={cancelSubmit}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              style={styles.successMessage}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              ✅ Answer submitted successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
