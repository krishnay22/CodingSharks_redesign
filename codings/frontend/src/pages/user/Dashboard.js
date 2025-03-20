import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const NewComponent = () => {
  const [percentage, setPercentage] = useState(65);

  return (
    <div
      style={{
        border: "2px solid black",  padding: "20px",borderRadius: "10px",position: "relative",minHeight: "650px",overflow: "hidden",background:"#F8F8F8",
      }} >
      <div className="container">
        <div className="box">
          <h4>Questions of the day</h4>
        </div>

        <div className="box1">
          <h4 className="box2">Events</h4>
          <div className="divider"></div>
          <div className="nested-box">
            <p>This will include future events</p>
          </div>
        </div>

        <div className="box1">
          <h4 className="box3">News</h4>
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
              textColor: "#333",pathColor: "#ff6600", trailColor: "#d6d6d6",})}/>
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
            padding: 50px;
            background: white;
            border: 2px solid black;
            border-radius: 19px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            margin-top: -16px;
            text-align: center;
          }
            .box:hover {
            border-color: #ff6600; 
          }
          .box h4 {
            position: absolute;
            top: 10px;
            left: 76px; 
            color: #333;
            background-color: white; 
            border: 2px solid #ff996e; 
            border-radius: 8px; 
            padding: 5px 10px;
          }
          .box1 {
            width: 55%;
            height: 180px;
            margin-left: -389px;
            background: white;
            border: 2px solid black;
            border-radius: 19px;
            margin-top: 20px;
            top:89px;
          }
            .box1:hover {
            border-color: #ff6600; /* Change border color to orange */
           }          
          .box2 {
            position: absolute;
            top: 134px;
            color: #333;
            background-color: white; 
            border: 2px solid #ff996e;
            border-radius: 8px;
            padding: 4px 10px;  
          }
          
            .box3 {
            position: absolute;
            top: 334px;
            color: #333;
            background-color: white; 
            border: 2px solid #ff996e; 
            border-radius: 8px;
            padding: 4px 10px; 
          }
          .divider {
            width: 100%;
            height: 1px;
            background: #ff996e;
            margin: 24px 0;
          }
          .nested-box {
            width: 90%;
            margin-left: 30px;
            height: 96px;
            padding: 10px;
            background: white;
            border: 2px solid black;
            border-radius: 19px;
          }
          .right-box {
            width: 275px;
            padding: 15px;
            background: white;
            border: 2px solid black;
            border-radius: 19px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            position: absolute;
            right: 177px;
            top: 145px;
          }
           .right-box:hover {
           border-color: #ff6600; /* Change border color to orange */
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
