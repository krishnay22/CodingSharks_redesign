import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnswerSubmissionModel() {
  const [time, setTime] = useState("0:00");
  const [progress, setProgress] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const [minutes, seconds] = prevTime.split(":").map(Number);
        let newSeconds = seconds + 1;
        let newMinutes = minutes;

        if (newSeconds >= 60) {
          newSeconds = 0;
          newMinutes += 1;
        }

        if (newMinutes >= 10) {
          clearInterval(timer);
          return "10:00";
        }

        const totalSeconds = newMinutes * 60 + newSeconds;
        const maxSeconds = 10 * 60;
        setProgress((totalSeconds / maxSeconds) * 100);

        return `${newMinutes}:${newSeconds.toString().padStart(2, "0")}`;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setCharacterCount(answer.length);
  }, [answer]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("Please enter an answer before submitting.");
      return;
    }

    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    setIsSubmitting(true);
    setShowConfirmation(false);

    // Simulate API call
    setTimeout(() => {
      console.log("Answer submitted:", {
        answer: answer,
        timeSpent: time,
        timestamp: new Date().toISOString(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset after showing success message
      setTimeout(() => {
        setAnswer("");
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
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
    progress: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "4px",
      width: `${progress}%`,
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
          <p>
            Write a JavaScript function named <strong>sum</strong> that takes
            two parameters and returns their sum. Then, call the function with
            the numbers 5 and 7 and log the result to the console.
          </p>
        </div>

        <div style={styles.timerContainer}>
          <div style={styles.progressBarContainer}>
            <div style={styles.progressBar}></div>
            <div style={styles.progress}></div>
          </div>
          <div style={styles.timer}>{time}</div>
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
            disabled={isSubmitting || isSubmitted}
          />
          <div style={styles.characterCounter}>{characterCount} characters</div>
        </div>

        <div style={styles.buttonContainer}>
          <motion.button
            style={{
              ...styles.button,
              ...((!answer.trim() || isSubmitting || isSubmitted) &&
                styles.buttonDisabled),
            }}
            whileHover={
              !answer.trim() || isSubmitting || isSubmitted
                ? {}
                : {
                    scale: 1.05,
                    backgroundColor: "#ff9d76",
                    color: "white",
                  }
            }
            whileTap={
              !answer.trim() || isSubmitting || isSubmitted
                ? {}
                : { scale: 0.95 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onClick={handleSubmit}
            disabled={!answer.trim() || isSubmitting || isSubmitted}
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
