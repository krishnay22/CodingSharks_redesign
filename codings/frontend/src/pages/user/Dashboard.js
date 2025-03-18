import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const NewComponent = () => {
  const [percentage, setPercentage] = useState(65);

  return (
    <div
    style={{
      border: "2px solid black",
      padding: "20px",
      borderRadius: "10px",
      position: "relative",
      minHeight: "650px",
      overflow: "hidden"
    }}
  >
    <div className="container">
      <div className="box">
        <h4>Questions of the day</h4>
      </div>
      
      <div className="box1">
        <h4>Events</h4>
        <div className="divider"></div>
        <div className="nested-box">
          <p>This will include future events</p>
        </div>
      </div>

      <div className="box1">
        <h4>News</h4>
        <div className="divider"></div>
        <div className="nested-box"></div>
      </div>
      
      <div className="right-box">
        <div className="progress-header">Web Development Progress</div>
        <div className="divider"></div>
        <p className="role">Front-end Developer</p>
        <ul className="progress-list">
          <li>Basic Document Structure</li>
          <li>Tags and Attributes</li>
          <li>List</li>
        </ul>
        <div className="progress-circle">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: "#333",
              pathColor: "#ff6600",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
      </div>
      
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }

        .box {
          width: 90%;
          padding: 30px;
          background: white;
          border: 2px solid black;
          border-radius: 10px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
          text-align: center;
        }
          .box1 {
          width: 55%;
          
          padding: 30px;
          background: white;
          border: 2px solid black;
          border-radius: 10px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
          text-align: center;
        }
        
        .divider {
          width: 100%;
          height: 1px;
          background: #ff996e;
          margin: 10px 0;
        }

        .nested-box {
          width: 90%;
          padding: 10px;
          background: white;
          border: 2px solid black;
          border-radius: 8px;
          text-align: center;
        }

        .right-box {
          width: 250px;
          padding: 15px;
          background: white;
          border: 2px solid black;
          border-radius: 10px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          position: absolute;
          right: 20px;
          top: 206px;
        }

        .progress-header {
          font-weight: bold;
          text-align: center;
        }

        .role {
          font-size: 16px;
          color: #333;
          text-align: center;
          margin: 10px 0;
        }

        .progress-list {
          list-style: none;
          padding: 0;
        }

        .progress-list li {
          padding: 5px 0;
          text-align: center;
        }

        .progress-circle {
          width: 100px;
          height: 100px;
          margin: 15px auto;
        }
      `}</style>
    </div>
    </div>
  );
};

export default NewComponent;
