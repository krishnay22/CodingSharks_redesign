import { useState } from "react";

export default function DailyquestionUpload() {
  const [activeTab, setActiveTab] = useState("questions");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "Write a JavaScript function named sum that takes two parameters and returns their sum. Then, call the function with the numbers 5 and 7 and log the result to the console.",
      difficulty: "Easy",
      timeLimit: 10,
    },
    {
      id: 2,
      text: "Create a React component that displays a counter and has buttons to increment and decrement the count.",
      difficulty: "Medium",
      timeLimit: 15,
    },
  ]);
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      studentId: "S001",
      studentName: "Alex Johnson",
      questionId: 1,
      answer:
        "function sum(a, b) {\n  return a + b;\n}\n\nconsole.log(sum(5, 7));",
      timeTaken: "4:23",
      status: "pending",
    },
    {
      id: 2,
      studentId: "S002",
      studentName: "Taylor Smith",
      questionId: 1,
      answer:
        "function sum(num1, num2) {\n  return num1 + num2;\n}\n\nconst result = sum(5, 7);\nconsole.log(result);",
      timeTaken: "6:45",
      status: "pending",
    },
    {
      id: 3,
      studentId: "S003",
      studentName: "Jamie Williams",
      questionId: 2,
      answer:
        "import React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <h2>Count: {count}</h2>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n      <button onClick={() => setCount(count - 1)}>Decrement</button>\n    </div>\n  );\n}\n\nexport default Counter;",
      timeTaken: "10:12",
      status: "pending",
    },
  ]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    difficulty: "Easy",
    timeLimit: 10,
  });
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter submissions based on search term
  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const newId =
      questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;

    setQuestions([
      ...questions,
      {
        id: newId,
        ...newQuestion,
      },
    ]);

    setNewQuestion({
      text: "",
      difficulty: "Easy",
      timeLimit: 10,
    });
  };

  const handleMarkSubmission = (submissionId, status) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === submissionId ? { ...sub, status } : sub
      )
    );
    setSelectedSubmission(null);
  };

  const deleteQuestion = (questionId) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
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

  const difficultyColors = {
    Easy: { bg: "#d1fae5", text: "#065f46" },
    Medium: { bg: "#fef3c7", text: "#92400e" },
    Hard: { bg: "#fee2e2", text: "#b91c1c" },
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "correct":
        return styles.statusCorrect;
      case "incorrect":
        return styles.statusIncorrect;
      default:
        return styles.statusPending;
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
            <form onSubmit={handleQuestionSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Question Text</label>
                <textarea
                  style={styles.textarea}
                  value={newQuestion.text}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, text: e.target.value })
                  }
                  required
                  placeholder="Enter question text here..."
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Difficulty</label>
                <select
                  style={styles.select}
                  value={newQuestion.difficulty}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      difficulty: e.target.value,
                    })
                  }
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Time Limit (minutes)</label>
                <input
                  type="number"
                  style={styles.input}
                  value={newQuestion.timeLimit}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      timeLimit: parseInt(e.target.value),
                    })
                  }
                  min="1"
                  max="60"
                  required
                />
              </div>

              <button type="submit" style={styles.button}>
                Add Question
              </button>
            </form>
          </div>

          <div style={styles.card}>
            <h2>Question Bank</h2>
            {questions.map((question) => (
              <div key={question.id} style={styles.questionCard}>
                <div style={styles.questionText}>
                  <p>{question.text}</p>
                  <div style={styles.questionMeta}>
                    <span
                      style={{
                        ...styles.badge,
                        backgroundColor:
                          difficultyColors[question.difficulty].bg,
                        color: difficultyColors[question.difficulty].text,
                      }}
                    >
                      {question.difficulty}
                    </span>
                    <span>{question.timeLimit} min</span>
                  </div>
                </div>
                <div>
                  <button
                    style={styles.cancelButton}
                    onClick={() => deleteQuestion(question.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
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
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                style={{
                  ...styles.submissionItem,
                  borderLeft: `4px solid ${
                    submission.status === "correct"
                      ? "#10b981"
                      : submission.status === "incorrect"
                      ? "#ef4444"
                      : "#9ca3af"
                  }`,
                }}
                onClick={() => setSelectedSubmission(submission)}
              >
                <div style={styles.submissionHeader}>
                  <div style={styles.studentInfo}>
                    {submission.studentName} ({submission.studentId})
                  </div>
                  <div>
                    <span
                      style={{
                        ...styles.badge,
                        ...getStatusStyles(submission.status),
                      }}
                    >
                      {submission.status === "correct"
                        ? "Correct"
                        : submission.status === "incorrect"
                        ? "Incorrect"
                        : "Pending"}
                    </span>
                  </div>
                </div>
                <div>
                  <strong>Question:</strong>{" "}
                  {questions
                    .find((q) => q.id === submission.questionId)
                    ?.text.substring(0, 50)}
                  ...
                </div>
                <div>
                  <strong>Time Taken:</strong> {submission.timeTaken}
                </div>
              </div>
            ))}
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
                <strong>Name:</strong> {selectedSubmission.studentName}
              </p>
              <p>
                <strong>ID:</strong> {selectedSubmission.studentId}
              </p>
              <p>
                <strong>Time Taken:</strong> {selectedSubmission.timeTaken}
              </p>
            </div>

            <div>
              <h3>Question</h3>
              <p>
                {
                  questions.find((q) => q.id === selectedSubmission.questionId)
                    ?.text
                }
              </p>
            </div>

            <div>
              <h3>Student's Answer</h3>
              <div style={styles.codeDisplay}>{selectedSubmission.answer}</div>
            </div>

            <div style={styles.buttonGroup}>
              <button
                style={styles.cancelButton}
                onClick={() =>
                  handleMarkSubmission(selectedSubmission.id, "incorrect")
                }
              >
                Mark as Incorrect
              </button>
              <button
                style={styles.button}
                onClick={() =>
                  handleMarkSubmission(selectedSubmission.id, "correct")
                }
              >
                Mark as Correct
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
