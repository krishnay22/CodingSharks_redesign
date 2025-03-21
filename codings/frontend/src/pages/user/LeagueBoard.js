import React, { useState } from "react";
const PillToggleSwitch = ({ onChange, defaultMonthly = true }) => {
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
        border: "2px solid black",
        padding: "20px",
        borderRadius: "20px",
        position: "relative",
        minHeight: "650px",
        background: "#F8F8F8",
        width: "100%",
        boxSizing: "border-box",
      
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "50%",
          transform: "translateX(50%)",
          display: "flex",
          borderRadius: "50px",
          border: "1px solid #e0e0e0",
          overflow: "hidden",
          padding: "2px",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <button
          onClick={() => handleToggle(true)}
          style={{
            backgroundColor: isMonthly ? "#FF9674" : "transparent",
            color: isMonthly ? "#ffffff" : "#000000",
            border: "none",
            padding: "8px 20px",
            borderRadius: "50px",
            cursor: "pointer",
            fontWeight: isMonthly ? "100" : "100", // Extra light font weight
            fontSize: "14px",
            transition: "all 0.3s ease",
            outline: "none",
            minWidth: "100px",
            textAlign: "center",
          }}
        >
          Monthly
        </button>
        <button
          onClick={() => handleToggle(false)}
          style={{
            backgroundColor: !isMonthly ? "#FF9674" : "transparent",
            color: !isMonthly ? "#ffffff" : "#000000",
            border: "none",
            padding: "8px 20px",
            borderRadius: "50px",
            cursor: "pointer",
            fontWeight: !isMonthly ? "100" : "100", // Extra light font weight
            fontSize: "14px",
            transition: "all 0.3s ease",
            outline: "none",
            minWidth: "100px",
            textAlign: "center",
          }}
        >
          Weekly
        </button>
      </div>

      <div style={{ width: "100%", paddingTop: "60px" }}>
        {isMonthly ? <Leaderboard type="Monthly" /> : <Leaderboard type="Weekly" />}
      </div>
    </div>
  );
};

const Leaderboard = ({ type }) => {
  // Custom dimensions for each leaderboard item
  const boxDimensions = [
    { width: "145%", height: "151px" },  // 1st box
    { width: "134%", height: "151px" },   // 2nd box
    { width: "134%", height: "151px" },  // 3rd box
    { width: "145%", height: "151px" }    // 4th box
  ];

  const leaderboardData = [
    { rank: 1, score: 12435, questionsSolved: 15, name: "Anubhav Parte", avatarUrl: null },
    { rank: 2, score: 12000, questionsSolved: 14, name: "Rohan Sharma", avatarUrl: null },
    { rank: 3, score: 11890, questionsSolved: 13, name: "Priya Verma", avatarUrl: null },
    { score: 11890, questionsSolved: 13, name: "Priya Verma", avatarUrl: null },

  ];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#f8f8f8",
      borderRadius: "20px",
      fontFamily: "Arial, sans-serif",
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
    }}>
      {leaderboardData.map((item, index) => (
        <LeaderboardItem 
          key={item.rank} 
          {...item} 
          customWidth={boxDimensions[index].width}
          customHeight={boxDimensions[index].height}
        />
      ))}
    </div>
  );
};

const LeaderboardItem = ({ rank, score, questionsSolved, name, avatarUrl, customWidth, customHeight }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      border: "1px solid #e0e0e0",
      borderRadius: "15px",
      padding: "10px",
      marginBottom: "15px",
      backgroundColor: "white",
      width: customWidth || "100%",
      height: customHeight || "auto",
      boxSizing: "border-box",
    }}>
      <div style={{ fontSize: "50px", fontWeight: "100", minWidth: "89px", textAlign: "center", marginRight: "16px" }}>{rank}.</div>
      <div style={{ width: "95px", height: "95px", borderRadius: "10px", overflow: "hidden", marginRight: "46px", border: "1px solid #e0e0e0", display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
        {avatarUrl ? <img src={avatarUrl} alt={`${name}'s avatar`} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "40px", height: "40px", borderRadius: "50%" }} />}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px", minWidth: 0, }}>
        <div style={{ border: "1px solid #e0e0e0", borderRadius: "17px", padding: "0px 16px", fontSize: "32px", color: "#555", width: "365px", fontWeight: "100" }}>Score: {score}</div>
        <div style={{ border: "1px solid #e0e0e0", borderRadius: "17px", padding: "0px 16px", fontSize: "32px", color: "#555", width: "365px", fontWeight: "100" }}>Questions Solved: {questionsSolved}</div>
      </div>
      <div style={{ width: "1px", height: "103px", backgroundColor: "#e0e0e0", margin: "0 15px", flexShrink: 0 }}></div>
      <div style={{ fontSize: "38px", color: "#666", fontWeight: "100", width: "315px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flexShrink: 0 }}>{name}</div>
    </div>
  );
};

export default PillToggleSwitch;