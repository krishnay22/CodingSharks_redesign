import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

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
    
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div
      style={{
        padding: "clamp(10px, 2vw, 20px)",
        borderRadius: "20px",
        position: "relative",
        minHeight: "clamp(400px, 80vh, 650px)",
        background: "#F8F8F8",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "clamp(15px, 2vw, 30px) 0",
        }}
      >
        <motion.div
          style={{
            width: "100%",
            maxWidth: "1232px",
            height: "auto",
            minHeight: "clamp(300px, 70vh, 580px)",
            borderRadius: "30px",
            backgroundColor: "white",
            border: "2px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "clamp(20px, 3vw, 40px)",
            position: "relative",
            margin: "0 auto",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3
            style={{
              fontSize: "clamp(14px, 2vw, 18px)",
              fontWeight: "bold",
              marginBottom: "clamp(10px, 1.5vw, 15px)",
            }}
          >
            Web Development
          </h3>

          <div
            style={{
              width: "clamp(200px, 50%, 67%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "clamp(15px, 2vw, 30px)",
            }}
          >
            <div style={{ width: "58%" }}>
              <ProgressBar
                now={60}
                style={{ height: "clamp(2px, 0.5vw, 4px)" }}
              />
            </div>
            <style jsx>{`
              .progress-bar {
                background-color: #ff6600 !important;
              }
              .progress {
                height: clamp(2px, 0.5vw, 4px) !important;
              }
            `}</style>
            <p
              style={{
                color: "#ff6600",
                fontSize: "clamp(14px, 2vw, 18px)",
                fontWeight: "bold",
                marginTop: "clamp(8px, 1.5vw, 12px)",
              }}
            >
              51% Complete
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(15px, 2vw, 25px)",
              width: "90%",
              maxWidth: "1087px",
            }}
          >
            {Object.keys(topics).map((topic) => (
              <motion.div
                key={topic}
                style={{
                  border: "2px solid black",
                  borderRadius: "30px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "clamp(15px, 2vw, 25px)",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setSelectedTopic(selectedTopic === topic ? null : topic)
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(15px, 2vw, 25px)",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(50px, 10vw, 70px)",
                      height: "clamp(50px, 10vw, 70px)",
                    }}
                  >
                    <CircularProgressbar
                      value={51}
                      text={`94s`}
                      styles={buildStyles({
                        textSize: "clamp(12px, 2vw, 18px)",
                        pathColor: "#ff6600",
                        textColor: "#ff6600",
                        trailColor: "#d6d6d6",
                      })}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: "clamp(14px, 2vw, 18px)",
                      fontWeight: "bold",
                    }}
                  >
                    {topic}
                  </p>
                </div>
                {selectedTopic === topic && (
                  <motion.div
                    style={{
                      width: "100%",
                      marginTop: "clamp(10px, 1.5vw, 15px)",
                      paddingTop: "clamp(10px, 1.5vw, 15px)",
                      borderTop: "1px solid black",
                      textAlign: "left",
                    }}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3
                      style={{
                        fontSize: "clamp(14px, 2vw, 18px)",
                        fontWeight: "bold",
                      }}
                    >
                      {topic}
                    </h3>
                    <ul
                      style={{
                        listStyleType: "none",
                        padding: "0",
                        margin: "clamp(5px, 1vw, 10px) 0 0 0",
                      }}
                    >
                      {topics[topic].map((item, index) => (
                        <motion.li
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "clamp(10px, 1.5vw, 15px)",
                            marginBottom: "clamp(5px, 1vw, 8px)",
                            cursor: "pointer",
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => window.open(item.url, "_blank")}
                        >
                          <span
                            style={{
                              width: "clamp(6px, 1vw, 10px)",
                              height: "clamp(6px, 1vw, 10px)",
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}