import React, { useState, useEffect } from "react";

export default function DailyquestionUpload() {
  const [activeTab, setActiveTab] = useState("questions");

  // State for questions fetched from backend
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [questionsError, setQuestionsError] = useState(null);

  // State for submissions fetched from backend
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [submissionsError, setSubmissionsError] = useState(null);

  const [newQuestion, setNewQuestion] = useState({
    question_text: "", // Matches backend field name
    duration: 10, // Matches backend field name
  });
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // State for the actual JWT token
  const [authToken, setAuthToken] = useState(null);
  // State to check if the current user is an admin (based on localStorage 'isAdmin' flag)
  const [isAdminUser, setIsAdminUser] = useState(false);

  // Base URL for your backend API
  const API_BASE_URL = "http://localhost:5000/api";

  // --- Fetch Auth Token and Admin Status from localStorage on component mount ---
  useEffect(() => {
    const token = localStorage.getItem("token"); // Corrected: fetching from "token"
    const adminStatus = localStorage.getItem("isAdmin"); // Corrected: fetching from "isAdmin"

    // Check if both token exists and isAdmin is "true" (as localStorage stores strings)
    if (token && adminStatus === "true") {
      setAuthToken(token);
      setIsAdminUser(true);
    } else {
      // Handle cases where token is missing or user is not an admin
      console.warn(
        "User is not an admin or JWT token not found in localStorage. Some features may be restricted."
      );
      // Optionally:
      // if (!token) {
      //   // Redirect to login page if no token
      //   // history.push('/login'); // If you use React Router
      // } else if (adminStatus !== "true") {
      //   // Show a message or redirect if logged in but not an admin
      // }
    }
  }, []); // Runs once on component mount

  // --- Fetch Questions ---
  const fetchQuestions = async () => {
    // Only attempt to fetch if authToken is available and user is an admin
    if (!authToken || !isAdminUser) {
      setLoadingQuestions(false); // Stop loading if conditions aren't met
      return;
    }

    setLoadingQuestions(true);
    setQuestionsError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/daily-questions`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Use the fetched token
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch questions");
      }
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestionsError(error.message);
    } finally {
      setLoadingQuestions(false);
    }
  };

  // --- Fetch Submissions ---
  const fetchSubmissions = async () => {
    // Only attempt to fetch if authToken is available and user is an admin
    if (!authToken || !isAdminUser) {
      setLoadingSubmissions(false); // Stop loading if conditions aren't met
      return;
    }

    setLoadingSubmissions(true);
    setSubmissionsError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/daily-questions/submissions`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Use the fetched token
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch submissions");
      }
      const data = await response.json();
      setSubmissions(data.submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setSubmissionsError(error.message);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  // UseEffect to fetch data when authToken becomes available or isAdminUser status changes
  useEffect(() => {
    if (authToken && isAdminUser) {
      // Only fetch if both token and admin status are confirmed
      fetchQuestions();
      fetchSubmissions();
    }
  }, [authToken, isAdminUser]); // Depend on authToken and isAdminUser

  // Filter submissions based on search term
  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.user_id?.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      submission.user_id?._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Handle New Question Submission ---
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!authToken || !isAdminUser) {
      alert("Unauthorized: Please log in as an admin to add questions.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/daily-questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Use the JWT
        },
        body: JSON.stringify(newQuestion),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add question");
      }

      alert("Question added successfully!");
      setNewQuestion({ question_text: "", duration: 10 });
      fetchQuestions(); // Refresh the list of questions
    } catch (error) {
      console.error("Error adding question:", error);
      alert(`Error adding question: ${error.message}`);
    }
  };

  // --- Handle Marking Submission (Correct/Incorrect) ---
  const handleMarkSubmission = async (submissionId, isCorrect) => {
    if (!authToken || !isAdminUser) {
      alert("Unauthorized: Please log in as an admin to mark submissions.");
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/daily-questions/submissions/${submissionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Use the JWT
          },
          body: JSON.stringify({ is_correct: isCorrect }), // Send boolean
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update submission status"
        );
      }

      alert("Submission status updated!");
      setSelectedSubmission(null); // Close modal
      fetchSubmissions(); // Refresh submissions list
    } catch (error) {
      console.error("Error marking submission:", error);
      alert(`Error marking submission: ${error.message}`);
    }
  };

  // --- Handle Deleting Question ---
  const deleteQuestion = async (questionId) => {
    if (!authToken || !isAdminUser) {
      alert("Unauthorized: Please log in as an admin to delete questions.");
      return;
    }
    if (
      !window.confirm(
        "Are you sure you want to delete this question and all its submissions?"
      )
    ) {
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/daily-questions/${questionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`, // Use the JWT
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete question");
      }

      alert("Question deleted successfully!");
      fetchQuestions(); // Refresh questions list
      fetchSubmissions(); // Also refresh submissions as some might have been deleted
    } catch (error) {
      console.error("Error deleting question:", error);
      alert(`Error deleting question: ${error.message}`);
    }
  };

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    title: {
      fontSize: "28px",
      color: "#333",
      margin: 0,
    },
    tabContainer: {
      display: "flex",
      borderBottom: "1px solid #ccc",
      marginBottom: "20px",
    },
    tab: {
      padding: "12px 24px",
      cursor: "pointer",
      borderBottom: "3px solid transparent",
      color: "#555",
      fontWeight: "500",
      transition: "all 0.3s ease",
    },
    activeTab: {
      borderBottom: "3px solid #ff9d76",
      color: "#ff9d76",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "15px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "500",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
      minHeight: "120px",
      fontFamily: "inherit",
    },
    select: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#ff9d76",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease",
    },
    cancelButton: {
      padding: "10px 20px",
      backgroundColor: "#f1f1f1",
      color: "#555",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      marginRight: "10px",
    },
    questionCard: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "15px",
      borderRadius: "8px",
      border: "1px solid #eee",
      marginBottom: "10px",
      backgroundColor: "#fafafa",
    },
    questionText: {
      flex: 1,
    },
    questionMeta: {
      display: "flex",
      gap: "10px",
      fontSize: "14px",
      color: "#777",
      marginTop: "8px",
    },
    badge: {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "500",
    },
    submissionItem: {
      padding: "15px",
      borderRadius: "8px",
      border: "1px solid #eee",
      marginBottom: "10px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    submissionHeader: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    studentInfo: {
      fontWeight: "500",
    },
    searchContainer: {
      marginBottom: "20px",
    },
    searchInput: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "white",
      borderRadius: "15px",
      padding: "20px",
      width: "90%",
      maxWidth: "800px",
      maxHeight: "90vh",
      overflow: "auto",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    codeDisplay: {
      backgroundColor: "#f5f5f5",
      padding: "15px",
      borderRadius: "8px",
      fontFamily: "monospace",
      whiteSpace: "pre-wrap",
      overflowX: "auto",
      marginBottom: "20px",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "20px",
    },
    statusPending: {
      backgroundColor: "#f3f4f6",
      color: "#374151",
    },
    statusCorrect: {
      backgroundColor: "#d1fae5",
      color: "#065f46",
    },
    statusIncorrect: {
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
    },
  };

  const getStatusStyles = (isCorrect) => {
    if (isCorrect === true) {
      return styles.statusCorrect;
    } else if (isCorrect === false) {
      return styles.statusIncorrect;
    } else {
      // Default for null/undefined or initial state
      return styles.statusPending;
    }
  };

  const getStatusText = (isCorrect) => {
    if (isCorrect === true) {
      return "Correct";
    } else if (isCorrect === false) {
      return "Incorrect";
    } else {
      return "Pending";
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}></div>

      <div style={styles.tabContainer}>
        <div
          style={{
            ...styles.tab,
            ...(activeTab === "questions" ? styles.activeTab : {}),
          }}
          onClick={() => setActiveTab("questions")}
        >
          Questions
        </div>
        <div
          style={{
            ...styles.tab,
            ...(activeTab === "submissions" ? styles.activeTab : {}),
          }}
          onClick={() => setActiveTab("submissions")}
        >
          Submissions
        </div>
      </div>

      {activeTab === "questions" && (
        <>
          <div style={styles.card}>
            <h2>Add New Question</h2>
            {isAdminUser ? ( // Only show form if isAdminUser is true
              <form onSubmit={handleQuestionSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Question Text</label>
                  <textarea
                    style={styles.textarea}
                    value={newQuestion.question_text}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        question_text: e.target.value,
                      })
                    }
                    required
                    placeholder="Enter question text here..."
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Duration (minutes)</label>
                  <input
                    type="number"
                    style={styles.input}
                    value={newQuestion.duration}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        duration: parseInt(e.target.value),
                      })
                    }
                    min="0"
                    required
                  />
                </div>

                <button type="submit" style={styles.button}>
                  Add Question
                </button>
              </form>
            ) : (
              <p style={{ color: "red" }}>
                Please log in as an admin to add questions.
              </p>
            )}
          </div>

          <div style={styles.card}>
            <h2>Question Bank</h2>
            {loadingQuestions ? (
              <p>Loading questions...</p>
            ) : questionsError ? (
              <p style={{ color: "red" }}>Error: {questionsError}</p>
            ) : questions.length === 0 ? (
              <p>No questions found. Add a new question above!</p>
            ) : (
              questions.map((question) => (
                <div key={question._id} style={styles.questionCard}>
                  <div style={styles.questionText}>
                    <p>{question.question_text}</p>
                    <div style={styles.questionMeta}>
                      <span>{question.duration} min</span>
                      {question.is_active && (
                        <span
                          style={{
                            ...styles.badge,
                            backgroundColor: "#dbeafe",
                            color: "#1e40af",
                          }}
                        >
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    {isAdminUser && ( // Only show delete button if isAdminUser is true
                      <button
                        style={styles.cancelButton}
                        onClick={() => deleteQuestion(question._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {activeTab === "submissions" && (
        <>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by student name or ID..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={styles.card}>
            <h2>Student Submissions</h2>
            {loadingSubmissions ? (
              <p>Loading submissions...</p>
            ) : submissionsError ? (
              <p style={{ color: "red" }}>Error: {submissionsError}</p>
            ) : filteredSubmissions.length === 0 ? (
              <p>No submissions found.</p>
            ) : (
              filteredSubmissions.map((submission) => (
                <div
                  key={submission._id}
                  style={{
                    ...styles.submissionItem,
                    borderLeft: `4px solid ${
                      getStatusStyles(submission.is_correct).backgroundColor
                    }`,
                  }}
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <div style={styles.submissionHeader}>
                    <div style={styles.studentInfo}>
                      {submission.user_id?.username || "N/A"} (ID:{" "}
                      {submission.user_id?._id || "N/A"})
                    </div>
                    <div>
                      <span
                        style={{
                          ...styles.badge,
                          ...getStatusStyles(submission.is_correct),
                        }}
                      >
                        {getStatusText(submission.is_correct)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <strong>Question:</strong>{" "}
                    {submission.daily_question_id?.question_text?.substring(
                      0,
                      50
                    ) || "N/A"}
                    ...
                  </div>
                  <div>
                    <strong>Submitted At:</strong>{" "}
                    {new Date(submission.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {selectedSubmission && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2>Review Submission</h2>
              <button
                style={styles.cancelButton}
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </button>
            </div>

            <div>
              <h3>Student Information</h3>
              <p>
                <strong>Name:</strong>{" "}
                {selectedSubmission.user_id?.username || "N/A"}
              </p>
              <p>
                <strong>ID:</strong> {selectedSubmission.user_id?._id || "N/A"}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {selectedSubmission.user_id?.email || "N/A"}
              </p>
              <p>
                <strong>Submitted At:</strong>{" "}
                {new Date(selectedSubmission.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <h3>Question</h3>
              <p>
                {selectedSubmission.daily_question_id?.question_text || "N/A"}
              </p>
            </div>

            <div>
              <h3>Student's Answer</h3>
              <div style={styles.codeDisplay}>
                {selectedSubmission.answer_text}
              </div>
            </div>

            {isAdminUser && ( // Only show mark buttons if isAdminUser is true
              <div style={styles.buttonGroup}>
                <button
                  style={styles.cancelButton}
                  onClick={() =>
                    handleMarkSubmission(selectedSubmission._id, false)
                  }
                >
                  Mark as Incorrect
                </button>
                <button
                  style={styles.button}
                  onClick={() =>
                    handleMarkSubmission(selectedSubmission._id, true)
                  }
                >
                  Mark as Correct
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
