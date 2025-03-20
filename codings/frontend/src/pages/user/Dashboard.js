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
        overflow: "hidden",
        background: "#F8F8F8",
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
          </div>
        </div>

        <style jsx>{`
          .container {
            padding: 20px;
            width: 100%;
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
            flex: 0 0 50%;
            max-width: 50%;
            padding: 0 15px;
          }
          .col-md-5 {
            flex: 0 0 41.666667%;
            max-width: 41.666667%;
            padding: 0 15px;
          }
          .offset-md-1 {
            margin-left: 8.333333%;
          }
          .col-sm-12 {
            padding: 0 15px;
          }
          .mt-4 {
            margin-top: 1.5rem;
          }
          .box {
            width: 100%;
            padding: 65px;
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
            left: -19px;
            color: #333;
            background-color: white;
            border: 2px solid #ff996e;
            border-radius: 8px;
            padding: 5px 10px;
          }
          .box1 {
            width: 119%;
            height: 180px;
            background: white;
            border: 2px solid black;
            border-radius: 34px;
            position: relative;
          }
          .box1:hover {
            border-color: #ff6600;
          }
          .box2 {
            position: absolute;
            top: -15px;
            left: -19px;
            color: #333;
            background-color: white;
            border: 2px solid #ff996e;
            border-radius: 8px;
            padding: 4px 10px;
          }
          .box3 {
            position: absolute;
            top: -15px;
            left: -19px;
            color: #333;
            background-color: white;
            border: 2px solid #ff996e;
            border-radius: 8px;
            padding: 4px 10px;
          }
          .divider {
            width: 96%;
            height: 1px;
            background: #ff996e;
            margin: 22px 0;
          }
          .nested-box {
            width: 90%;
            margin-left: 5%;
            height: 87px;
            padding: 10px;
            background: white;
            border: 2px solid black;
            border-radius: 19px;
             margin-top: 45px;
          }
          .right-box {
            width: 98%;
            padding: 16px;
            background: white;
            border: 2px solid black;
            border-radius: 19px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          }
          .right-box:hover {
            border-color: #ff6600;
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
          
          @media (max-width: 768px) {
            .col-md-6, .col-md-5 {
              flex: 0 0 100%;
              max-width: 100%;
            }
            .offset-md-1 {
              margin-left: 0;
            }
            .right-box {
              margin-top: 1.5rem;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default NewComponent;