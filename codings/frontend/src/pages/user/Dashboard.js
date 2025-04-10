import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const NewComponent = () => {
  const [percentage, setPercentage] = useState(65);

  return (
    <div
      style={{
        padding: "clamp(10px, 2vw, 20px)",
        borderRadius: "10px",
        position: "relative",
        minHeight: "clamp(400px, 100vh, 650px)",
        overflow: "hidden",
        background: "#F8F8F8",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="box">
              <h4>Questions of the day</h4>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6 col-sm-12">
            <div className="box1">
              <h4 className="box2">Events</h4>
              <div className="divider"></div>
              <div className="nested-box">
                <p>This will include future events</p>
              </div>
            </div>

            <div className="box1 mt-4">
              <h4 className="box3">News</h4>
              <div className="divider"></div>
              <div className="nested-box"></div>
            </div>
          </div>

          <div className="col-md-5 col-sm-12 offset-md-1">
            <div className="right-box">
              <div className="progress-header">Web Development Progress</div>
              <div className="divider"></div>
              <p className="role">Front-End Developer</p>
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
                    textSize: "16px",
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .container {
            padding: clamp(10px, 2vw, 20px);
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
          }
          .row {
            display: flex;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
          }
          .col-12 {
            flex: 0 0 100%;
            max-width: 100%;
            padding: 0 15px;
          }
          .col-md-6 {
            flex: 0 0 100%;
            max-width: 100%;
            padding: 0 15px;
          }
          .col-md-5 {
            flex: 0 0 100%;
            max-width: 100%;
            padding: 0 15px;
          }
          .offset-md-1 {
            margin-left: 0;
          }
          .col-sm-12 {
            padding: 0 15px;
          }
          .mt-4 {
            margin-top: clamp(1rem, 2vw, 1.5rem);
          }
          .box {
            width: 100%;
            padding: clamp(20px, 5vw, 65px);
            background: white;
            border: 2px solid black;
            border-radius: 34px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            margin-top: -16px;
            text-align: center;
            position: relative;
          }
          .box:hover {
            border-color: #ff6600;
          }
          .box h4 {
            position: absolute;
            top: -15px;
            left: clamp(10px, 2vw, 20px);
            color: #333;
            background-color: white;
            border: 2px solid #ff996e;
            border-radius: 8px;
            padding: clamp(3px, 1vw, 5px) clamp(5px, 1.5vw, 10px);
            font-size: clamp(26px, 2vw, 18px);
          }
          .box1 {
            width: 119%;
            height: clamp(120px, 25vw, 180px);
            background: white;
            border: 2px solid black;
            border-radius: 34px;
            position: relative;
          }
          .box1:hover {
            border-color: #ff6600;
          }
          .box2,
          .box3 {
            position: absolute;
            top: -15px;
            left: clamp(10px, 2vw, 20px);
            color: #333;
            background-color: white;
            border: 2px solid #ff996e;
            border-radius: 8px;
            padding: clamp(3px, 1vw, 4px) clamp(5px, 1.5vw, 10px);
            font-size: clamp(24px, 2vw, 18px);
          }
          .divider {
            width: 96%;
            height: 1px;
            background: #ff996e;
            margin: clamp(15px, 2vw, 22px) auto;
          }
          .nested-box {
            width: 90%;
            margin-left: 5%;
            height: clamp(60px, 15vw, 87px);
            padding: clamp(5px, 1.5vw, 10px);
            background: white;
            border: 2px solid black;
            border-radius: 19px;
            margin-top: clamp(10px, 5vw, 30px);
          }
          .right-box {
            width: 100%;
            padding: clamp(10px, 2vw, 15px);
            background: white;
            border: 2px solid black;
            border-radius: 19px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            position: relative;
            height: auto; /* Changed to auto to accommodate content */
            min-height: 390px; /* Use min-height instead of fixed height */
          }
          .right-box:hover {
            border-color: #ff6600;
          }
          .progress-header {
            font-weight: bold;
            text-align: center;
            color: #333;
            background-color: white;
            border: 2px solid #ff996e;
            border-radius: 8px;
            padding: clamp(5px, 1vw, 10px) clamp(10px, 5vw, 40px);
            font-size: clamp(14px, 2vw, 18px);
            position: relative;
            top: 0;
            left: 0;
            transform: none;
            margin-bottom: clamp(10px, 2vw, 20px);
            display: inline-block;
          }
          .role {
            font-size: clamp(16px, 2vw, 21px);
            color: #333;
            margin: clamp(5px, 1vw, 10px) 0;
            position: relative;
            left: clamp(20px, 5vw, 50px);
          }
          .progress-list {
            list-style-type: disc;
            padding-left: clamp(40px, 6vw, 70px);
            margin: 0;
          }
          .progress-list li {
            padding: clamp(5px, 1vw, 10px) 0;
            position: relative;
            left: clamp(20px, 5vw, 50px);
            font-size: clamp(14px, 2vw, 16px);
            color: #333; /* Text color black */
          }
          .progress-list li::marker {
            color: #ff6600; /* Bullet color orange */
          }
          .progress-circle {
            width: clamp(80px, 15vw, 50px);
            height: clamp(80px, 15vw, 120px);
            margin: clamp(-9px, 2vw, -10px) auto;
          }

          @media (min-width: 992px) {
            .col-md-6 {
              flex: 0 0 50%;
              max-width: 50%;
            }
            .col-md-5 {
              flex: 0 0 41.666667%;
              max-width: 41.666667%;
            }
            .offset-md-1 {
              margin-left: 8.333333%;
            }
            .box1 {
              width: 119%; /* Original width for desktop */
            }
          }

          @media (min-width: 768px) and (max-width: 991px) {
            .col-md-6 {
              flex: 0 0 50%;
              max-width: 50%;
            }
            .col-md-5 {
              flex: 0 0 41.666667%;
              max-width: 41.666667%;
            }
            .offset-md-1 {
              margin-left: 8.333333%;
            }
            .box1 {
              width: 100%; /* Adjusted for tablet to avoid overflow */
            }
          }

          @media (max-width: 767px) {
            .col-md-6,
            .col-md-5 {
              flex: 0 0 100%;
              max-width: 100%;
            }
            .offset-md-1 {
              margin-left: 0;
            }
            .right-box {
              margin-top: clamp(1rem, 2vw, 1.5rem);
              padding: clamp(15px, 3vw, 20px);
              min-height: 300px; /* Adjusted min-height for mobile */
            }
            .progress-header {
              padding: clamp(5px, 1vw, 10px) clamp(10px, 3vw, 20px);
              margin: 0 auto;
              display: table;
            }
            .role,
            .progress-list li {
              left: clamp(10px, 3vw, 20px);
            }
            .box1 {
              width: 100%; /* Adjusted for mobile to avoid overflow */
            }
          }

          @media (max-width: 480px) {
            .box1 {
              height: auto;
              min-height: clamp(100px, 20vw, 150px);
            }
            .nested-box {
              height: auto;
              min-height: clamp(50px, 12vw, 70px);
              margin-top: clamp(5px, 3vw, 15px);
            }
            .progress-circle {
              width: clamp(60px, 15vw, 90px);
              height: clamp(60px, 15vw, 90px);
            }
            .box h4,
            .box2,
            .box3 {
              font-size: clamp(14px, 4vw, 16px);
              padding: clamp(2px, 0.8vw, 4px) clamp(4px, 1.2vw, 8px);
            }
            .progress-list li {
              font-size: clamp(12px, 3.5vw, 14px);
              color: #333; /* Text color black on small screens */
            }
            .progress-list li::marker {
              color: #ff6600; /* Bullet color orange on small screens */
            }
            .role {
              font-size: clamp(14px, 4vw, 16px);
            }
            .right-box {
              min-height: 340px; /* Adjusted to fit progress circle */
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default NewComponent;