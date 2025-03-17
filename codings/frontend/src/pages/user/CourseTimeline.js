import { useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function CourseTimeline() {
  useEffect(() => {
    document.body.style.backgroundColor = "#F8F8F8";
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.overflow = ""; // Reset overflow on unmount
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
        <h3
          style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}
        >
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

        {/* 📌 Rectangle Box 1 */}
        <div
          style={{
            width: "1069px",
            height: "220px",
            border: "2px solid black",
            borderRadius: "23px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            marginBottom: "20px",
            marginTop: "-20px",
          }}
        >
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginRight: "854px",
              }}
            >
              Front End
            </p>
            <ul
              style={{
                listStyleType: "none",
                padding: "0",
                margin: "5px 0 0 0",
              }}
            >
              <li style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#ff6600",
                    borderRadius: "50%",
                  }}
                ></span>
                Tags and Attributes
              </li>
            </ul>
          </div>
        </div>

        {/* 📌 Rectangle Box 2 (Increased Height) */}
        <div
          style={{
            width: "1069px",
            height: "676px",
            border: "2px solid black",
            borderRadius: "23px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            marginTop: "-11px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              alignSelf: "flex-start",
              marginTop: "20px",
            }}
          >
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
          <div style={{ flex: 1, marginLeft: "42px",marginTop:"-267px" }}>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                margin: "10px",
                whiteSpace: "nowrap",
              }}
            >
              Front End
            </p>
            <ul
              style={{
                listStyleType: "none",
                padding: "0",
                margin: "5px 0 0 0",
              }}
            >
              <li style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#ff6600",
                    borderRadius: "50%",
                  }}
                ></span>
                Tags and Attributes
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
