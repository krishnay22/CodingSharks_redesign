import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper function for responsive values (simplifies clamp usage)
const responsiveValue = (min, vw, max) =>
  `clamp(${min}rem, ${vw}vw, ${max}rem)`;

// LeaderboardItem Component (Modified to accept isSelf prop)
const LeaderboardItem = ({
  rank,
  score,
  questionsSolved,
  name,
  avatarUrl,
  logo,
  width,
  isSelf,
}) => {
  const itemStyles = {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${isSelf ? "#ff9d76" : "#e0e0e0"}`, // Highlight self
    borderRadius: responsiveValue(0.75, 2, 1.25),
    padding: responsiveValue(0.375, 1.2, 0.625),
    marginBottom: responsiveValue(0.375, 1, 0.75),
    backgroundColor: isSelf ? "#fff7ed" : "white", // Lighter background for self
    width: "100%",
    maxWidth: width,
    height: responsiveValue(4, 12, 6.25),
    flexWrap: "wrap",
    gap: responsiveValue(0.25, 1, 0.625),
    boxSizing: "border-box", // Ensure padding is included in width/height
    boxShadow: isSelf
      ? "0 4px 15px rgba(255, 157, 118, 0.2)"
      : "0 2px 8px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  };

  const rankBadgeStyle = {
    fontSize: responsiveValue(1, 3, 1.5),
    fontWeight: "normal",
    minWidth: responsiveValue(2, 5, 3.125),
    textAlign: "center",
    marginRight: responsiveValue(0.375, 1.2, 0.625),
    flexShrink: 0,
    // Specific styles for top ranks
    ...(rank === 1 && { color: "#FFD700", fontWeight: "bold" }), // Gold
    ...(rank === 2 && { color: "#C0C0C0", fontWeight: "bold" }), // Silver
    ...(rank === 3 && { color: "#CD7F32", fontWeight: "bold" }), // Bronze
  };

  const avatarContainerStyle = {
    width: responsiveValue(2.5, 10, 3.75),
    height: responsiveValue(2.5, 10, 3.75),
    borderRadius: responsiveValue(0.5, 1.5, 1),
    overflow: "hidden",
    marginRight: responsiveValue(0.375, 1.2, 0.625),
    border: `1px solid ${isSelf ? "#ff9d76" : "#e0e0e0"}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#f0f0f0", // Placeholder background
  };

  const infoSectionStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: responsiveValue(0.125, 0.6, 0.375),
    minWidth: responsiveValue(7.5, 20, 11.25),
  };

  const infoBoxStyle = {
    border: `1px solid ${isSelf ? "#ff9d76" : "#e0e0e0"}`,
    borderRadius: responsiveValue(0.5, 1, 0.75),
    padding: `${responsiveValue(0.25, 0.6, 0.375)} ${responsiveValue(
      0.375,
      1.2,
      0.625
    )}`,
    fontSize: responsiveValue(0.625, 1.8, 0.875),
    color: "#555",
    textAlign: "left",
    width: "100%",
    maxWidth: responsiveValue(12.5, 40, 21.875),
    height: responsiveValue(1.25, 3.5, 1.75),
    boxSizing: "border-box",
    display: "flex", // Use flex to center content vertically
    alignItems: "center",
  };

  const dividerStyle = {
    width: "1px",
    height: responsiveValue(2.5, 10, 3.75),
    backgroundColor: "#e0e0e0",
    margin: `0 ${responsiveValue(0.375, 1.2, 0.625)}`,
    flexShrink: 0,
  };

  const nameStyle = {
    fontSize: responsiveValue(0.75, 2, 1),
    color: "#666",
    fontWeight: "normal",
    width: responsiveValue(5, 15, 7.5),
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    flexShrink: 0,
  };

  return (
    <div style={itemStyles}>
      <div style={rankBadgeStyle}>{rank}.</div>

      <div style={avatarContainerStyle}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/100x100/eeeeee/aaaaaa?text=User";
            }}
          />
        ) : (
          logo || (
            <svg
              width={responsiveValue(1.5, 5, 1.875)}
              height={responsiveValue(1.5, 5, 1.875)}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 20C24.1421 20 27.5 16.6421 27.5 12.5C27.5 8.35786 24.1421 5 20 5C15.8579 5 12.5 8.35786 12.5 12.5C12.5 16.6421 15.8579 20 20 20Z"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32.5 35C32.5 28.0964 26.9036 22.5 20 22.5C13.0964 22.5 7.5 28.0964 7.5 35"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )
        )}
      </div>

      <div style={infoSectionStyle}>
        <div style={infoBoxStyle}>Score: {score}</div>
        <div style={infoBoxStyle}>Correct Answers: {questionsSolved}</div>
      </div>

      <div style={dividerStyle}></div>

      <div style={nameStyle}>{name}</div>
    </div>
  );
};

// Leaderboard Component (Fetches data, calculates points, handles self-profile)
const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserEntry, setCurrentUserEntry] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    // Get the current user's ID from localStorage
    // Assuming you store it as 'userId' or similar after login
    const storedUserId = localStorage.getItem("userId"); // Adjust this key if different
    setCurrentUserId(storedUserId);

    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token"); // Get user's JWT token

        if (!token) {
          setError("You must be logged in to view the leaderboard.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/leaderboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch leaderboard data."
          );
        }

        const data = await response.json();
        const rawLeaderboard = data.leaderboard;

        // Process leaderboard data to assign ranks and separate current user
        let processedLeaderboard = [];
        let selfEntry = null;

        rawLeaderboard.forEach((entry, index) => {
          const rank = index + 1; // Rank is simply the index + 1 after sorting by backend
          const entryWithRank = { ...entry, rank };

          if (
            storedUserId &&
            entry.user_id &&
            entry.user_id._id === storedUserId
          ) {
            selfEntry = entryWithRank;
          } else {
            processedLeaderboard.push(entryWithRank);
          }
        });

        setLeaderboardData(processedLeaderboard);
        setCurrentUserEntry(selfEntry);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []); // Empty dependency array means this runs once on mount

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: responsiveValue(0.5, 2, 0.9375),
    backgroundColor: "#f8f8f8",
    borderRadius: responsiveValue(0.75, 2, 1.25),
    fontFamily: "Arial, sans-serif",
    width: "100%",
    boxSizing: "border-box",
    flex: 1,
    maxWidth: responsiveValue(20, 90, 68.75), // Max width for the leaderboard container
    margin: "0 auto", // Center the leaderboard
  };

  const titleStyles = {
    fontSize: responsiveValue(1.5, 4, 2), // Adjust title size
    fontWeight: "700",
    color: "#ff9d76",
    textAlign: "center",
    marginBottom: responsiveValue(1, 3, 1.5),
    textShadow: "1px 1px 2px rgba(0,0,0,0.05)",
  };

  const listContainerStyles = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: responsiveValue(0.5, 1.5, 1), // Spacing between leaderboard items
  };

  const messageStyles = {
    textAlign: "center",
    padding: responsiveValue(1, 2, 1.25),
    fontSize: responsiveValue(0.875, 2, 1),
    color: "#777",
  };

  const errorMessageStyles = {
    ...messageStyles,
    color: "red",
  };

  const selfProfileContainerStyles = {
    width: "100%",
    marginTop: responsiveValue(1, 2, 1.5),
    paddingTop: responsiveValue(0.5, 1.5, 1),
    borderTop: "2px dashed #e0e0e0", // Separator for self-profile
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>🏆 Daily Question Leaderboard 🏆</h1>

      {loading && <p style={messageStyles}>Loading leaderboard...</p>}
      {error && <p style={errorMessageStyles}>Error: {error}</p>}

      {!loading &&
        !error &&
        leaderboardData.length === 0 &&
        !currentUserEntry && (
          <p style={messageStyles}>
            No leaderboard data available yet. Be the first to earn points!
          </p>
        )}

      {!loading && !error && (
        <>
          <div style={listContainerStyles}>
            {leaderboardData.map((item) => (
              <LeaderboardItem
                key={item.userId || item.user_id._id} // Use userId from aggregation or user_id._id from populate
                rank={item.rank}
                score={item.total_points} // Use total_points from UserScore
                questionsSolved={item.total_correct_answers} // Use total_correct_answers
                name={item.username || item.user_id.username} // Use username from populated user_id
                avatarUrl={item.user_id.profile_picture_url || null} // Assuming a profile picture field
                // logo={...} // You can add custom logos if needed
                width="100%" // Items take full width of their container
                isSelf={false}
              />
            ))}
          </div>

          {currentUserEntry && (
            <div style={selfProfileContainerStyles}>
              <h2
                style={{
                  ...titleStyles,
                  fontSize: responsiveValue(1.25, 3, 1.75),
                  marginBottom: responsiveValue(0.5, 1, 0.75),
                }}
              >
                Your Rank
              </h2>
              <LeaderboardItem
                key={currentUserEntry.userId || currentUserEntry.user_id._id}
                rank={currentUserEntry.rank}
                score={currentUserEntry.total_points}
                questionsSolved={currentUserEntry.total_correct_answers}
                name={
                  currentUserEntry.username || currentUserEntry.user_id.username
                }
                avatarUrl={currentUserEntry.user_id.profile_picture_url || null}
                width="100%"
                isSelf={true} // Mark as self for special styling
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

// ToggleButton Component (Remains largely the same, but simplified responsive styles)
const ToggleButton = ({ onChange, defaultMonthly = true, children }) => {
  const [isMonthly, setIsMonthly] = useState(defaultMonthly);

  const handleToggle = (value) => {
    setIsMonthly(value);
    if (onChange) {
      onChange(value);
    }
  };

  const toggleContainerStyles = {
    padding: responsiveValue(0.5, 2, 1),
    borderRadius: responsiveValue(1, 2, 1.25),
    position: "relative",
    background: "#F8F8F8",
    width: "100%",
    boxSizing: "border-box",
    maxWidth: responsiveValue(20, 90, 68.75),
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "auto",
  };

  const buttonGroupStyles = {
    position: "relative",
    display: "flex",
    borderRadius: responsiveValue(1.5, 3, 3.125),
    border: "1px solid #e0e0e0",
    overflow: "hidden",
    padding: responsiveValue(0.125, 0.5, 0.1875),
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    width: "fit-content",
    marginBottom: responsiveValue(0.5, 2, 0.9375),
  };

  const sliderStyles = {
    position: "absolute",
    top: responsiveValue(0.125, 0.5, 0.1875),
    bottom: responsiveValue(0.125, 0.5, 0.1875),
    left: isMonthly ? responsiveValue(0.125, 0.5, 0.1875) : "50%",
    width: "50%",
    backgroundColor: "#FF9674",
    borderRadius: responsiveValue(1.5, 3, 3.125),
    zIndex: 0,
  };

  const buttonBaseStyles = {
    backgroundColor: "transparent",
    border: "none",
    padding: `${responsiveValue(0.375, 1, 0.5)} ${responsiveValue(0.75, 2, 1)}`,
    borderRadius: responsiveValue(1.5, 3, 3.125),
    cursor: "pointer",
    fontWeight: "500",
    fontSize: responsiveValue(0.75, 1.5, 0.875),
    transition: "all 0.3s ease",
    outline: "none",
    minWidth: responsiveValue(3.75, 10, 5),
    position: "relative",
    zIndex: 1,
  };

  return (
    <div style={toggleContainerStyles}>
      <div style={buttonGroupStyles}>
        {/* Sliding background indicator */}
        <motion.div
          style={sliderStyles}
          animate={{
            left: isMonthly ? responsiveValue(0.125, 0.5, 0.1875) : "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />

        {/* Monthly Button */}
        <button
          onClick={() => handleToggle(true)}
          style={{
            ...buttonBaseStyles,
            color: isMonthly ? "#ffffff" : "#000000",
          }}
        >
          Monthly
        </button>

        {/* Weekly Button */}
        <button
          onClick={() => handleToggle(false)}
          style={{
            ...buttonBaseStyles,
            color: !isMonthly ? "#ffffff" : "#000000",
          }}
        >
          Weekly
        </button>
      </div>

      <div style={{ width: "100%", flex: 1 }}>{children}</div>
    </div>
  );
};

// App Component
const App = () => {
  const [isMonthly, setIsMonthly] = useState(true); // State for the toggle

  const appContainerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: responsiveValue(0.5, 2, 1),
    width: "100%",
    minHeight: "100vh", // Use minHeight to allow content to push height
    boxSizing: "border-box",
    backgroundColor: "#fff",
    overflowY: "auto", // Allow scrolling if content overflows
  };

  return (
    <div style={appContainerStyles}>
      {/* The ToggleButton wraps the Leaderboard */}
      <ToggleButton defaultMonthly={isMonthly} onChange={setIsMonthly}>
        {/* The Leaderboard component itself does not currently differentiate between Monthly/Weekly
            This toggle is passed down but the Leaderboard fetches overall data.
            To make it truly monthly/weekly, the Leaderboard component would need to accept a 'type' prop
            and modify its API call (e.g., /leaderboard?period=monthly)
        */}
        <Leaderboard />
      </ToggleButton>
    </div>
  );
};

export default App;
