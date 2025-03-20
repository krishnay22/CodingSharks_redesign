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
      {/* Toggle Switch */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "518px", // Moves the switch to the right
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
            fontWeight: isMonthly ? "500" : "400",
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
            fontWeight: !isMonthly ? "500" : "400",
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

      {/* Content area */}
      <div style={{ width: "100%", paddingTop: "60px" }}>
        {isMonthly ? <div>{/* Monthly content */}</div> : <div>{/* Weekly content */}</div>}
      </div>
    </div>
  );
};

export default PillToggleSwitch;
