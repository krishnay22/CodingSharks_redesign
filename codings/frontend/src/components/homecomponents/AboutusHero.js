import React from "react";

const AboutUsHero = () => {
  return (
    <div className="about-us-container">
      <div className="background-overlay"></div>
      <div className="content-wrapper">
        <div className="about-us-content">
          <h1 className="about-us-title">About Us</h1>
          <div className="about-us-divider"></div>
          <ul className="about-us-list">
            <li>Who we are</li>
          </ul>
          <h2 className="about-us-tagline">Where passion meets programming</h2>
        </div>
        <div className="scroll-indicator">
          <p>Scroll</p>
          <div className="scroll-line"></div>
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .about-us-container {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: "Arial", sans-serif;
          background-image: url("https://img.freepik.com/free-photo/full-shot-people-having-meeting_23-2148868402.jpg?t=st=1744023401~exp=1744027001~hmac=f25ee7dff4b1afa945254a7dac8f1a8d0cf18f6168e21b1af612d2643084fca7&w=1380");
          background-size: cover;
          background-position: center;
          color: #fff;
          overflow: hidden;
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
        }

        .content-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px;
          z-index: 2;
        }

        .about-us-content {
          max-width: 600px;
          margin-top: 100px;
        }

        .about-us-title {
          font-size: clamp(36px, 8vw, 64px);
          font-weight: bold;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .about-us-divider {
          width: 300px;
          height: 2px;
          background-color: #fff;
          margin: 5px 0 10px 0;
        }

        .about-us-list {
          list-style-type: disc;
          margin-left: 20px;
          margin-bottom: 30px;
          font-size: clamp(16px, 3vw, 18px);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .about-us-tagline {
          font-size: clamp(22px, 5vw, 36px);
          font-weight: normal;
          margin-top: 10px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center; /* If you want to center its children vertically */
          margin: 0 auto; /* This centers the whole container horizontally */
          margin-bottom: 20px;
        }

        .scroll-indicator p {
          margin-bottom: 10px;
          font-size: 16px;
        }

        .scroll-line {
          width: 2px;
          height: 60px;
          background-color: #fff;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 20px;
          }

          .about-us-content {
            margin-top: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUsHero;
