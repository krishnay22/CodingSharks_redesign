import React, { useState, useEffect } from "react";

export default function LeaderboardPage() {
  // State for submissions fetched from backend
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [submissionsError, setSubmissionsError] = useState(null);

  // State for leaderboard data
  const [allTimeLeaderboard, setAllTimeLeaderboard] = useState([]);
  const [monthlyLeaderboard, setMonthlyLeaderboard] = useState([]);
  const [leaderboardCategory, setLeaderboardCategory] = useState("allTime"); // 'allTime' or 'monthly'
  // Removed: [currentUserScore, setCurrentUserScore] = useState(null);

  // State for the actual JWT token
  const [authToken, setAuthToken] = useState(null);
  // State to check if the current user is an admin (though not strictly needed for viewing,
  // the submission fetching might require auth)
  const [isAdminUser, setIsAdminUser] = useState(false); // Keep for consistent auth check in fetch

  // Base URL for your backend API
  const API_BASE_URL = "http://localhost:5000/api";

  // --- Custom Message Box State and Functions (replaces alert and confirm) ---
  const [messageBox, setMessageBox] = useState({
    visible: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const showMessageBox = (title, message, onConfirm = null) => {
    setMessageBox({ visible: true, title, message, onConfirm });
  };

  const hideMessageBox = () => {
    setMessageBox({ ...messageBox, visible: false });
  };

  // This is a simple placeholder for confirm. For a full custom UI,
  // you'd expand showMessageBox to handle 'yes/no' options.
  const confirmAction = (message) => {
    return window.confirm(message);
  };
  // --- End Custom Message Box ---

  // --- Fetch Auth Token and Admin Status from localStorage on component mount ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminStatus = localStorage.getItem("isAdmin");
    // Removed: const userId = localStorage.getItem("userId");

    if (token && adminStatus === "true") {
      setAuthToken(token);
      setIsAdminUser(true); // Still set, as fetchSubmissions might be admin-protected
    } else if (token) {
      // Allow non-admin users to view leaderboard if submissions endpoint is accessible
      setAuthToken(token);
      setIsAdminUser(false);
    } else {
      console.warn(
        "User is not logged in. Leaderboard data might be restricted or unavailable."
      );
    }
  }, []);

  // --- Fetch Submissions ---
  const fetchSubmissions = async () => {
    // Only attempt to fetch if authToken is available
    if (!authToken) {
      setLoadingSubmissions(false);
      showMessageBox(
        "Authentication Required",
        "Please log in to view the leaderboard."
      );
      return;
    }

    setLoadingSubmissions(true);
    setSubmissionsError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/daily-questions/submissions`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
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
      console.error("Error fetching submissions for leaderboard:", error);
      setSubmissionsError(error.message);
      showMessageBox("Error", `Failed to load leaderboard: ${error.message}`);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  // UseEffect to fetch data when authToken becomes available
  useEffect(() => {
    if (authToken) {
      fetchSubmissions();
    }
  }, [authToken]); // Depend on authToken

  // Function to calculate leaderboard data
  const calculateLeaderboard = (allSubmissions) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const allTimeScores = {};
    const monthlyScores = {};

    allSubmissions.forEach((submission) => {
      if (submission.is_correct && submission.points_awarded > 0) {
        const userId = submission.user_id?._id;
        const username = submission.user_id?.username || "Unknown User";
        const submissionDate = new Date(submission.createdAt);

        if (userId) {
          // All-time scores
          if (!allTimeScores[userId]) {
            allTimeScores[userId] = {
              userId,
              username,
              score: 0,
              lastSubmissionTime: new Date(0),
            };
          }
          allTimeScores[userId].score += submission.points_awarded;
          // Update last submission time for tie-breaking (earlier is better, though not strictly used for sorting here)
          if (submissionDate > allTimeScores[userId].lastSubmissionTime) {
            allTimeScores[userId].lastSubmissionTime = submissionDate;
          }

          // Monthly scores
          if (
            submissionDate.getMonth() === currentMonth &&
            submissionDate.getFullYear() === currentYear
          ) {
            if (!monthlyScores[userId]) {
              monthlyScores[userId] = {
                userId,
                username,
                score: 0,
                lastSubmissionTime: new Date(0),
              };
            }
            monthlyScores[userId].score += submission.points_awarded;
            if (submissionDate > monthlyScores[userId].lastSubmissionTime) {
              monthlyScores[userId].lastSubmissionTime = submissionDate;
            }
          }
        }
      }
    });

    const sortedAllTime = Object.values(allTimeScores).sort(
      (a, b) => b.score - a.score
    );
    const sortedMonthly = Object.values(monthlyScores).sort(
      (a, b) => b.score - a.score
    );

    setAllTimeLeaderboard(sortedAllTime);
    setMonthlyLeaderboard(sortedMonthly);

    // Removed: Calculate current user's score
    // const currentUserId = localStorage.getItem("userId");
    // if (currentUserId) {
    //   const userScore = (leaderboardCategory === "allTime" ? sortedAllTime : sortedMonthly).find(user => user.userId === currentUserId);
    //   setCurrentUserScore(userScore || { userId: currentUserId, username: "You", score: 0 });
    // }
  };

  // useEffect: Recalculate leaderboard when submissions or leaderboardCategory change
  useEffect(() => {
    if (submissions.length > 0 || !loadingSubmissions) {
      calculateLeaderboard(submissions);
    }
  }, [submissions, loadingSubmissions, leaderboardCategory]); // Recalculate when submissions data or category changes

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Inter', sans-serif",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "15px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    leaderboardTable: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    leaderboardTh: {
      backgroundColor: "#f3f4f6",
      padding: "12px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
      color: "#333",
    },
    leaderboardTd: {
      padding: "12px",
      borderBottom: "1px solid #eee",
      color: "#555",
    },
    // Removed: leaderboardUserRow style
    leaderboardToggle: {
      display: "flex",
      marginBottom: "20px",
      gap: "10px",
    },
    toggleButton: {
      padding: "8px 15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      backgroundColor: "#f9f9f9",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    toggleButtonActive: {
      backgroundColor: "#ff9d76",
      color: "white",
      borderColor: "#ff9d76",
    },
    messageBoxOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
    },
    messageBox: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "25px",
      width: "90%",
      maxWidth: "400px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
    },
    messageBoxTitle: {
      fontSize: "22px",
      marginBottom: "15px",
      color: "#333",
    },
    messageBoxMessage: {
      fontSize: "16px",
      marginBottom: "25px",
      color: "#555",
    },
    messageBoxButton: {
      padding: "10px 20px",
      backgroundColor: "#ff9d76",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease",
      minWidth: "100px",
    },
  };

  // Removed: Get current user's ID from localStorage
  // const currentUserId = localStorage.getItem("userId");

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Leaderboard</h2>

        <div style={styles.leaderboardToggle}>
          <button
            style={{
              ...styles.toggleButton,
              ...(leaderboardCategory === "allTime"
                ? styles.toggleButtonActive
                : {}),
            }}
            onClick={() => setLeaderboardCategory("allTime")}
          >
            All-Time
          </button>
          <button
            style={{
              ...styles.toggleButton,
              ...(leaderboardCategory === "monthly"
                ? styles.toggleButtonActive
                : {}),
            }}
            onClick={() => setLeaderboardCategory("monthly")}
          >
            Monthly
          </button>
        </div>

        <h3>
          {leaderboardCategory === "allTime"
            ? "All-Time Top Scorers"
            : "Monthly Top Scorers"}
        </h3>
        {loadingSubmissions ? (
          <p>Loading leaderboard data...</p>
        ) : submissionsError ? (
          <p style={{ color: "red" }}>Error: {submissionsError}</p>
        ) : (
          <>
            <table style={styles.leaderboardTable}>
              <thead>
                <tr>
                  <th style={styles.leaderboardTh}>Rank</th>
                  <th style={styles.leaderboardTh}>Student Name</th>
                  <th style={styles.leaderboardTh}>Score</th>
                </tr>
              </thead>
              <tbody>
                {(leaderboardCategory === "allTime"
                  ? allTimeLeaderboard
                  : monthlyLeaderboard
                ).length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      style={{ ...styles.leaderboardTd, textAlign: "center" }}
                    >
                      No scores yet.
                    </td>
                  </tr>
                ) : (
                  (leaderboardCategory === "allTime"
                    ? allTimeLeaderboard
                    : monthlyLeaderboard
                  ).map((entry, index) => (
                    <tr
                      key={entry.userId}
                      // Removed: style={entry.userId === currentUserId ? styles.leaderboardUserRow : {}}
                    >
                      <td style={styles.leaderboardTd}>{index + 1}</td>
                      <td style={styles.leaderboardTd}>{entry.username}</td>
                      <td style={styles.leaderboardTd}>{entry.score}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Removed: currentUserId && currentUserScore && (...) block */}
          </>
        )}
      </div>

      {/* Custom Message Box Render */}
      {messageBox.visible && (
        <div style={styles.messageBoxOverlay}>
          <div style={styles.messageBox}>
            <h3 style={styles.messageBoxTitle}>{messageBox.title}</h3>
            <p style={styles.messageBoxMessage}>{messageBox.message}</p>
            <button
              style={styles.messageBoxButton}
              onClick={() => {
                hideMessageBox();
                if (messageBox.onConfirm) {
                  messageBox.onConfirm();
                }
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
