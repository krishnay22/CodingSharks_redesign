import React, { useState, useEffect } from "react";

// Custom hook for responsive design
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });
  
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount
  
  return windowSize;
}

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
          zIndex: "1"
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
            fontWeight: isMonthly ? "100" : "100",
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
            fontWeight: !isMonthly ? "100" : "100",
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
  const leaderboardData = [
    { rank: 1, score: 12435, questionsSolved: 15, name: "Anubhav Parte", avatarUrl: null },
    { rank: 2, score: 12000, questionsSolved: 14, name: "Rohan Sharma", avatarUrl: null },
    { rank: 3, score: 11890, questionsSolved: 13, name: "Priya Verma", avatarUrl: null },
    { rank: 4, score: 11890, questionsSolved: 13, name: "Priya Verma", avatarUrl: null },
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
          key={index} 
          {...item} 
        />
      ))}
    </div>
  );
};

const LeaderboardItem = ({ rank, score, questionsSolved, name, avatarUrl }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  
  return (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      border: "1px solid #e0e0e0",
      borderRadius: "15px",
      padding: "10px",
      marginBottom: "15px",
      backgroundColor: "white",
      width: "100%",
      boxSizing: "border-box",
    }}>
      <div style={{ 
        fontSize: isMobile ? "30px" : "50px", 
        fontWeight: "100", 
        minWidth: isMobile ? "auto" : "89px", 
        textAlign: "center", 
        marginRight: isMobile ? "0" : "16px",
        marginBottom: isMobile ? "10px" : "0"
      }}>
        {rank}.
      </div>
      
      <div style={{ 
        width: isMobile ? "80px" : "95px", 
        height: isMobile ? "80px" : "95px", 
        borderRadius: "10px", 
        overflow: "hidden", 
        marginRight: isMobile ? "0" : "46px", 
        marginBottom: isMobile ? "10px" : "0",
        border: "1px solid #e0e0e0", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flexShrink: 0 
      }}>
        {avatarUrl ? 
          <img src={avatarUrl} alt={`${name}'s avatar`} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> 
          : <div style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
        }
      </div>
      
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        gap: "5px", 
        minWidth: 0,
        width: isMobile ? "100%" : "auto",
        marginBottom: isMobile ? "10px" : "0"
      }}>
        <div style={{ 
          border: "1px solid #e0e0e0", 
          borderRadius: "17px", 
          padding: "0px 16px", 
          fontSize: isMobile ? "22px" : "32px", 
          color: "#555", 
          width: isMobile ? "100%" : "365px", 
          boxSizing: "border-box",
          fontWeight: "100" 
        }}>
          Score: {score}
        </div>
        <div style={{ 
          border: "1px solid #e0e0e0", 
          borderRadius: "17px", 
          padding: "0px 16px", 
          fontSize: isMobile ? "22px" : "32px", 
          color: "#555", 
          width: isMobile ? "100%" : "365px", 
          boxSizing: "border-box",
          fontWeight: "100" 
        }}>
          Questions Solved: {questionsSolved}
        </div>
      </div>
      
      {!isMobile && (
        <div style={{ 
          width: "1px", 
          height: "103px", 
          backgroundColor: "#e0e0e0", 
          margin: "0 15px", 
          flexShrink: 0 
        }}></div>
      )}
      
      <div style={{ 
        fontSize: isMobile ? "24px" : "38px", 
        color: "#666", 
        fontWeight: "100", 
        width: isMobile ? "100%" : "315px", 
        whiteSpace: "nowrap", 
        overflow: "hidden", 
        textOverflow: "ellipsis", 
        flexShrink: 0,
        textAlign: isMobile ? "center" : "left"
      }}>
        {name}
      </div>
    </div>
  );
};

export default PillToggleSwitch;