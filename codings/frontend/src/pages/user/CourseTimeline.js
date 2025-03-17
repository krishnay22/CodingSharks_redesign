import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function CourseTimeline() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const topics = {
    "Front End": ["JS", "Operators", "Strings", "If-Else"],
    "Back End": ["if Statements", "Loops", "Database Connection"]
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#F8F8F8";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "115vh",
        width: "112vw",
        position: "fixed",
        top: "11px",
        left: "0",
        padding: "30px 0",
      }}
    >
      <div
        style={{
          width: "1130px",
          height: "590px",
          borderRadius: "44px",
          backgroundColor: "white",
          border: "2px solid black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "30px",
          position: "relative",
          margin: "auto",
        }}
      >
        <h3 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
          Web Development
        </h3>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <ProgressBar
            now={30}
            style={{ width: "30%", height: "3px", backgroundColor: "#ff6600" }}
          />
          <p
            style={{
              color: "#ff6600",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            51% Complete
          </p>
        </div>

        {/* Topic Sections */}
        {["Front End", "Back End"].map((topic) => (
          <div
            key={topic}
            style={{
              width: "1069px",
              border: "2px solid black",
              borderRadius: "23px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              marginBottom: "20px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <div style={{ width: "60px", height: "60px" }}>
                <CircularProgressbar
                  value={51}
                  text={`94s`}
                  styles={buildStyles({
                    textSize: "16px",
                    pathColor: "#ff6600",
                    textColor: "#ff6600",
                    trailColor: "#d6d6d6",
                  })}
                />
              </div>
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>{topic}</p>
            </div>
            
            {/* Topic List Inside Box */}
            {selectedTopic === topic && (
              <div
                style={{
                  width: "100%",
                  marginTop: "10px",
                  paddingTop: "10px",
                  borderTop: "1px solid black",
                  textAlign: "left",
                }}
              >
                <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>{topic}</h3>
                <ul style={{ listStyleType: "none", padding: "0", margin: "5px 0 0 0" }}>
                  {topics[topic].map((item, index) => (
                    <li key={index} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          backgroundColor: "#ff6600",
                          borderRadius: "50%",
                        }}
                      ></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
