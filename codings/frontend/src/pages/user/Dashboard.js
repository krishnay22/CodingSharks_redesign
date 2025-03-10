import React from "react";

const Dashboard = () => {
  return (
    <div className="new-component">
      <div className="top-line"></div>

      {/* First Rectangle */}
      <div className="rectangle-box">
        <h4>Questions of the day</h4>
      </div>

      {/* Second Rectangle (Events Box) */}
      <div className="second-rectangle-box">
        <h4>Events</h4>

        {/* Line just below the "Events" title */}
        <div className="event-line"></div>

        {/* Nested Rectangle inside the second rectangle */}
        <div className="nested-rectangle">
          <p>This will include future events</p>
        </div>
      </div>

      {/* Third Rectangle */}
      <div className="third-rectangle-box">
        <h4>News</h4>

        {/* Line just below the "News" title */}
        <div className="news-line"></div>

        {/* Nested Rectangle inside the third rectangle */}
        <div className="nested-rectangle"></div>

        {/* Side box inside the third rectangle */}
        <div className="right-side-box">
          <div className="progress-box">Web Development Progress</div>

          {/* Line below Web Development Progress */}
          <div className="progress-line"></div>

          <p className="development-text">Front-end Developer</p>

          {/* Line below Front-end Developer */}
          <div className="web-dev-line"></div>

          <ul className="structure-list">
            <li className="has-line">Basic Document Structure</li>
            <li className="has-line">Tags and Attribute</li>
            <li>List</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        /* Container for the new component */
        .new-component {
          padding: 20px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Top Line */
        .top-line {
          width: 100%; /* Full width of the parent container */
          height: 1px; /* Height of the line */
          background-color: #ff6600; /* Orange color for the line */
          margin-bottom: 30px; /* Space between the line and the rectangle box */
          margin-top: 50px;
        }

        /* Rectangle Box */
        .rectangle-box {
          width: 100%; /* Width of the rectangle box */
          max-width: 60%; /* Maximum width */
          margin-left: 70px;
          height: 60px; /* Reduced height for shorter box */
          background-color: white; /* Light grey background for the box */
          border-radius: 20px; /* Rounded corners */
          border: 2px solid black; /* Default black border */
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for the box */
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: border-color 0.3s ease; /* Smooth transition for border color change */
        }

        /* Hover effect for the rectangle box */
        .rectangle-box:hover {
          border-color: #e0dcd9; /* Change border color to orange on hover */
        }

        .rectangle-box h4 {
          position: absolute;
          top: 91px; /* Move the text above the rectangle */
          left: 330px; /* Align the text with the left border of the rectangle */
          margin-top: -10px;
          font-size: 22px;
          color: #333;
          font-weight: bold;
          padding-left: 10px; /* Slight padding to keep the text away from the very edge */
          background-color: white; /* Match the background color of the second rectangle */
          border: 2px black; /* Add border to the "Events" text */
          border-radius: 10px; /* Slight rounding for the "Events" box */
          padding: 5px 10px; /* Padding to make the text box fit nicely around the text */
        }

        .rectangle-box p {
          font-size: 16px;
          color: #555;
          margin-top: 10px;
        }

        /* Second Rectangle Box */
        .second-rectangle-box {
          width: 90%;
          max-width: 600px;
          margin-right: 280px;
          height: 100px;
          background-color: white;
          border-radius: 30px;
          border: 2px solid black;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 40px;
          position: relative; /* Allows positioning the title inside */
        }

        /* Styling for the text inside the second rectangle (Events) */
        .second-rectangle-box h4 {
          position: absolute;
          top: -16px; /* Move the text above the rectangle */
          left: 20px; /* Align the text with the left border of the rectangle */
          margin: 0;
          font-size: 22px;
          color: #333;
          font-weight: bold;
          padding-left: 10px; /* Slight padding to keep the text away from the very edge */
          background-color: white; /* Match the background color of the second rectangle */
          border: 2px solid #ff996e; /* Add border to the "Events" text */
          border-radius: 8px; /* Slight rounding for the "Events" box */
          padding: 5px 10px; /* Padding to make the text box fit nicely around the text */
        }

        .event-line {
          width: 100%; /* Full width of the container */
          height: 1px; /* Thinner line (reduced from 2px to 1px) */
          background-color: #ff996e; /* Default color */
          margin-top: 8px; /* Space between the "Events" title and the line */
        }

        /* Hover effect for the second rectangle */
        .second-rectangle-box:hover {
          border-color: #ff996e;
        }

        /* Nested rectangle inside the second rectangle */
        .nested-rectangle {
          width: 80%;
          max-width: 800px;
          height: 60px;
          background-color: white;
          border-radius: 30px;
          border: 2px solid #0c0c01;
          padding: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 15px;
        }

        /* Nested rectangle text styling */
        .nested-rectangle h5 {
          margin: 0;
          font-size: 18px;
          color: #333;
        }

        .nested-rectangle p {
          font-size: 14px;
          color: #555;
          margin-top: 10px;
        }

        /* Third Rectangle Box */
        .third-rectangle-box {
          width: 90%; /* Same width as the second rectangle */
          max-width: 600px; /* Maximum width, similar to the second rectangle */
          margin-right: 280px; /* Align to the right */
          height: 100px; /* Height of the third rectangle */
          background-color: #f8f8f8; /* Light grey background */
          border-radius: 30px; /* Rounded corners */
          border: 2px solid black; /* Border for the third rectangle */
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for the third box */
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 20px; /* Space between the second and third rectangles */
          transition: border-color 0.3s ease; /* Smooth transition for border color change */
          position: relative; /* Position context for the heading */
        }

        /* Hover effect for the third rectangle */
        .third-rectangle-box:hover {
          border-color: #ff996e; /* Change border color on hover */
        }

        /* Styling for the "News" text inside the third rectangle */
        .third-rectangle-box h4 {
          position: absolute; /* Absolute positioning inside the box */
          top: -15px; /* Move the "News" text upwards */
          left: 20px; /* Position it towards the left side */
          margin: 0;
          font-size: 18px; /* Adjusted font size */
          color: #333;
          font-weight: bold;
          background-color: #f8f8f8; /* Matches the background color */
          border: 2px solid black;
          border-radius: 8px;
          padding: 3px 8px; /* Smaller padding */
        }

        .news-line {
          width: 100%; /* Full width of the container */
          height: 1px; /* Thinner line */
          background-color: #ff996e; /* Default color */
          margin-top: -2px; /* Space between the "News" title and the line */
        }

        /* Styling for the nested rectangle inside the third rectangle */
        .third-rectangle-box .nested-rectangle {
          width: 80%; /* Width of the nested rectangle */
          max-width: 800px; /* Maximum width */
          height: 60px; /* Height of the nested rectangle */
          background-color: #f8f8f8; /* Slightly darker grey for the nested box */
          border-radius: 30px; /* Rounded corners for the nested rectangle */
          border: 2px solid #0c0c01; /* Border for the nested rectangle */
          padding: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px; /* Space between the third rectangle and the nested one */
        }

        /* Nested rectangle text styles */
        .third-rectangle-box .nested-rectangle h5 {
          margin: 0;
          font-size: 18px;
          color: #333;
        }

        .third-rectangle-box .nested-rectangle p {
          font-size: 14px;
          color: #555;
          margin-top: 10px;
        }

        /* Right-side box styles */
        .right-side-box {
          width: 230px; /* Set the desired width */
          height: 280px; /* Set the desired height */
          background-color: #f8f8f8;
          border-radius: 10px;
          box-shadow: 0px 2px 5px rgba(22, 22, 22, 0.1);
          position: absolute;
          left: 700px;
          top: -160px;
          padding: 20px;
          display: flex;
          flex-direction: column; /* Align items vertically */
          justify-content: flex-start;
          align-items: center;
          z-index: 10;
          border: 2px solid black; /* Black border */
        }

        /* Progress box inside right-side box */
        .right-side-box .progress-box {
          background-color: #f8f8f8;
          border: 2px solid black;
          border-radius: 8px;
          padding: 10px 10px;
          font-size: 16px;
          color: #333;
          font-weight: bold;
          margin-bottom: -29px; /* Adds space below the progress box */
          position: relative;
          top: -50px;
          left: -30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 230px;
        }

        /* Progress line under the "Web Development Progress" */
        .progress-line {
          width: 100%; /* Full width of the container */
          height: 1px;
          background-color: black;
          margin-bottom: -7px; /* Adds space below the line */
        }

        /* Development text styling */
        .development-text {
          font-size: 16px;
          color: #333;
          margin-top: 15px; /* Adds space between the progress line and the text */
        }

        /* New line just below the Development text */
        .web-dev-line {
          width: 100%; /* Full width of the container */
          height: 1px;
          background-color: black;
          margin-top: 7px; /* Adds space between the text and the line */
        }

        .structure-list {
          padding-left: 0; /* Remove default padding from the list */
          list-style-type: none; /* Remove default bullet points */
          position: relative; /* To position the vertical line */
        }

        .structure-list li {
          color: #333; /* Set text color */
          margin-bottom: 20px; /* Space between each item */
          position: relative; /* Position the custom bullet */
          padding-left: 30px; /* Add padding to make space for the bullet */
        }

        /* Create custom round dot (bullet) */
        .structure-list li::before {
          content: ""; /* Empty content to represent the bullet */
          position: absolute; /* Position the bullet relative to the li */
          left: 0; /* Place it at the left edge */
          top: 50%; /* Vertically center the bullet */
          transform: translateY(-50%); /* Adjust for exact centering */
          width: 8px; /* Width of the bullet */
          height: 8px; /* Height of the bullet */
          background-color: transparent; /* No color for the dot */
          border: 2px solid #333; /* Default gray color for the dot border */
          border-radius: 50%; /* Make the bullet circular */
        }

        /* Change the color of the first and second bullet points to orange */
        .structure-list li.has-line::before {
          background-color: #ff996e; /* Fill the bullet with orange color */
          border: none; /* Remove the border */
        }

        /* Create the vertical line from the first bullet to the second bullet */
        .structure-list .has-line::after {
          content: "";
          position: absolute;
          left: 4px;
          top: 40%;
          width: 1px;
          height: 30px;
          background-color: #ff996e;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
