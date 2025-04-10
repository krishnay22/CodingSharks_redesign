import React, { useState } from "react";
import { motion } from "framer-motion";

// ToggleButton Component
const ToggleButton = ({ onChange, defaultMonthly = true, children }) => {
  const [isMonthly, setIsMonthly] = useState(defaultMonthly);

  const handleToggle = (value) => {
    setIsMonthly(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div
      style={{
        padding: "clamp(0.5rem, 2vw, 1rem)", // Responsive padding
        borderRadius: "clamp(1rem, 2vw, 1.25rem)",
        position: "relative",
        background: "#F8F8F8",
        width: "100%",
        boxSizing: "border-box",
        maxWidth: "clamp(20rem, 90vw, 68.75rem)", // Responsive max-width (320px to 1100px)
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "auto", // Let height adjust to content
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          borderRadius: "clamp(1.5rem, 3vw, 3.125rem)",
          border: "1px solid #e0e0e0",
          overflow: "hidden",
          padding: "clamp(0.125rem, 0.5vw, 0.1875rem)",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          width: "fit-content",
          marginBottom: "clamp(0.5rem, 2vw, 0.9375rem)",
        }}
      >
        {/* Sliding background indicator */}
        <motion.div
          style={{
            position: "absolute",
            top: "clamp(0.125rem, 0.5vw, 0.1875rem)",
            bottom: "clamp(0.125rem, 0.5vw, 0.1875rem)",
            left: isMonthly ? "clamp(0.125rem, 0.5vw, 0.1875rem)" : "50%",
            width: "50%",
            backgroundColor: "#FF9674",
            borderRadius: "clamp(1.5rem, 3vw, 3.125rem)",
            zIndex: 0,
          }}
          animate={{
            left: isMonthly ? "clamp(0.125rem, 0.5vw, 0.1875rem)" : "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />

        {/* Monthly Button */}
        <button
          onClick={() => handleToggle(true)}
          style={{
            backgroundColor: "transparent",
            color: isMonthly ? "#ffffff" : "#000000",
            border: "none",
            padding: "clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)",
            borderRadius: "clamp(1.5rem, 3vw, 3.125rem)",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)", // Responsive font size
            transition: "all 0.3s ease",
            outline: "none",
            minWidth: "clamp(3.75rem, 10vw, 5rem)",
            position: "relative",
            zIndex: 1,
          }}
        >
          Monthly
        </button>

        {/* Weekly Button */}
        <button
          onClick={() => handleToggle(false)}
          style={{
            backgroundColor: "transparent",
            color: !isMonthly ? "#ffffff" : "#000000",
            border: "none",
            padding: "clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)",
            borderRadius: "clamp(1.5rem, 3vw, 3.125rem)",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
            transition: "all 0.3s ease",
            outline: "none",
            minWidth: "clamp(3.75rem, 10vw, 5rem)",
            position: "relative",
            zIndex: 1,
          }}
        >
          Weekly
        </button>
      </div>

      <div style={{ width: "100%", flex: 1 }}>{children}</div>
    </div>
  );
};

// LeaderboardItem Component
const LeaderboardItem = ({ rank, score, questionsSolved, name, avatarUrl, logo, width }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #e0e0e0",
        borderRadius: "clamp(0.75rem, 2vw, 1.25rem)",
        padding: "clamp(0.375rem, 1.2vw, 0.625rem)",
        marginBottom: "clamp(0.375rem, 1vw, 0.75rem)",
        backgroundColor: "white",
        width: "100%",
        maxWidth: width,
        height: "clamp(4rem, 12vw, 6.25rem)", // Responsive height
        flexWrap: "wrap",
        gap: "clamp(0.25rem, 1vw, 0.625rem)",
      }}
    >
      <div
        style={{
          fontSize: "clamp(1rem, 3vw, 1.5rem)",
          fontWeight: "normal",
          minWidth: "clamp(2rem, 5vw, 3.125rem)",
          textAlign: "center",
          marginRight: "clamp(0.375rem, 1.2vw, 0.625rem)",
          flexShrink: 0,
        }}
      >
        {rank}.
      </div>

      <div
        style={{
          width: "clamp(2.5rem, 10vw, 3.75rem)",
          height: "clamp(2.5rem, 10vw, 3.75rem)",
          borderRadius: "clamp(0.5rem, 1.5vw, 1rem)",
          overflow: "hidden",
          marginRight: "clamp(0.375rem, 1.2vw, 0.625rem)",
          border: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          logo
        )}
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.125rem, 0.6vw, 0.375rem)",
          minWidth: "clamp(7.5rem, 20vw, 11.25rem)",
        }}
      >
        <div
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "clamp(0.5rem, 1vw, 0.75rem)",
            padding: "clamp(0.25rem, 0.6vw, 0.375rem) clamp(0.375rem, 1.2vw, 0.625rem)",
            fontSize: "clamp(0.625rem, 1.8vw, 0.875rem)",
            color: "#555",
            textAlign: "left",
            width: "100%",
            maxWidth: "clamp(12.5rem, 40vw, 21.875rem)",
            height: "clamp(1.25rem, 3.5vw, 1.75rem)",
            boxSizing: "border-box",
          }}
        >
          Score: {score}
        </div>
        <div
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "clamp(0.5rem, 1vw, 0.75rem)",
            padding: "clamp(0.25rem, 0.6vw, 0.375rem) clamp(0.375rem, 1.2vw, 0.625rem)",
            fontSize: "clamp(0.625rem, 1.8vw, 0.875rem)",
            color: "#555",
            textAlign: "left",
            width: "100%",
            maxWidth: "clamp(12.5rem, 40vw, 21.875rem)",
            height: "clamp(1.25rem, 3.5vw, 1.75rem)",
            boxSizing: "border-box",
          }}
        >
          Questions Solved: {questionsSolved}
        </div>
      </div>

      <div
        style={{
          width: "1px",
          height: "clamp(2.5rem, 10vw, 3.75rem)",
          backgroundColor: "#e0e0e0",
          margin: "0 clamp(0.375rem, 1.2vw, 0.625rem)",
          flexShrink: 0,
        }}
      ></div>

      <div
        style={{
          fontSize: "clamp(0.75rem, 2vw, 1rem)",
          color: "#666",
          fontWeight: "normal",
          width: "clamp(5rem, 15vw, 7.5rem)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        {name}
      </div>
    </div>
  );
};

// Leaderboard Component
const Leaderboard = ({ type = "Monthly" }) => {
  const leaderboardData = [
    { rank: 1, score: 12435, questionsSolved: 12, name: "Anubhav Parte", avatarUrl: null, logo: null },
    { rank: 2, score: 11430, questionsSolved: 10, name: "Anubhav", avatarUrl: null, logo: null },
    { rank: 3, score: 11025, questionsSolved: 8, name: "Monika Patidar", avatarUrl: null, logo: null },
    {
    
      score: 10850,
      questionsSolved: 7,
      name: "Sakshi Jain",
      avatarUrl: "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg",
      logo: (
        <svg
          width="clamp(1.5rem, 5vw, 1.875rem)"
          height="clamp(1.5rem, 5vw, 1.875rem)"
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
      ),
    },
  ];

  const dimensions = [
    { width: "100%" },
    { width: "95%" },
    { width: "95%" },
    { width: "100%" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(0.5rem, 2vw, 0.9375rem)",
        backgroundColor: "#f8f8f8",
        borderRadius: "clamp(0.75rem, 2vw, 1.25rem)",
        fontFamily: "Arial, sans-serif",
        width: "100%",
        boxSizing: "border-box",
        flex: 1, // Allow it to grow within available space
      }}
    >
      {leaderboardData.map((item, index) => (
        <LeaderboardItem
          key={item.rank}
          rank={item.rank}
          score={item.score}
          questionsSolved={item.questionsSolved}
          name={item.name}
          avatarUrl={item.avatarUrl}
          logo={item.logo}
          width={dimensions[index]?.width || "100%"}
        />
      ))}
    </div>
  );
};

// App Component
const App = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(0.5rem, 2vw, 1rem)",
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundColor: "#fff", // Optional: Clean background for the app
      }}
    >
      <ToggleButton defaultMonthly={isMonthly} onChange={setIsMonthly}>
        {isMonthly ? <Leaderboard type="Monthly" /> : <Leaderboard type="Weekly" />}
      </ToggleButton>
    </div>
  );
};

export default App;