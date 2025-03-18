import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion } from "framer-motion";

export default function CourseTimeline() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const topics = {
    "Front End": [
      {
        name: "JS",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "Operators",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators",
      },
      {
        name: "Strings",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
      },
      {
        name: "If-Else",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
      },
    ],
    "Back End": [
      {
        name: "if Statements",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
      },
      {
        name: "Loops",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for",
      },
      {
        name: "Database Connection",
        url: "https://www.postgresql.org/docs/current/libpq-connect.html",
      },
    ],
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
        height: "110vh",
        width: "115vw",
        position: "fixed",
        top: "11px",
        left: "0",
        padding: "30px 0",
      }}
    >
      <motion.div
        style={{
          width: "1232px",
          height: "580px",
          borderRadius: "30px",
          backgroundColor: "white",
          border: "2px solid black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "40px",
          position: "relative",
          margin: "auto",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}
        >
          Web Development
        </h3>

        <div
          style={{
            width: "67%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <ProgressBar
            now={30}
            style={{ width: "35%", height: "4px", backgroundColor: "#ff6600" }}
          />
          <p
            style={{
              color: "#ff6600",
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "12px",
            }}
          >
            51% Complete
          </p>
        </div>

        {Object.keys(topics).map((topic) => (
          <motion.div
            key={topic}
            style={{
              width: "1200px",
              border: "2px solid black",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              padding: "25px",
              marginBottom: "25px",
              cursor: "pointer",
            }}
            onClick={() =>
              setSelectedTopic(selectedTopic === topic ? null : topic)
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
              <div style={{ width: "70px", height: "70px" }}>
                <CircularProgressbar
                  value={51}
                  text={`94s`}
                  styles={buildStyles({
                    textSize: "18px",
                    pathColor: "#ff6600",
                    textColor: "#ff6600",
                    trailColor: "#d6d6d6",
                  })}
                />
              </div>
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>{topic}</p>
            </div>
            {selectedTopic === topic && (
              <motion.div
                style={{
                  width: "100%",
                  marginTop: "15px",
                  paddingTop: "15px",
                  borderTop: "1px solid black",
                  textAlign: "left",
                }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {topic}
                </h3>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: "0",
                    margin: "10px 0 0 0",
                  }}
                >
                  {topics[topic].map((item, index) => (
                    <motion.li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        marginBottom: "8px",
                        cursor: "pointer",
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => window.open(item.url, "_blank")}
                    >
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: "#ff6600",
                          borderRadius: "50%",
                        }}
                      ></span>
                      {item.name}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
