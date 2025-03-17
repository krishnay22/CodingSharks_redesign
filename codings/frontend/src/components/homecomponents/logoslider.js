import React from "react";
import { Container } from "react-bootstrap";

// Array of logo images (replace with actual paths)
const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
  "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
];

function LogoSlider() {
  return (
    <div className="logo-slider-container">
      <h4 className="logo-slider-title">Our Students Work At</h4>
      <div className="logo-slider">
        <div className="logo-track">
          {/* Duplicate logos to create a seamless effect */}
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Company Logo"
              className="logo-img"
            />
          ))}
        </div>
      </div>

      {/* ✅ Moved CSS Inside `style jsx` */}
      <style jsx>{`
        /* Logo Slider Container */
        .logo-slider-container {
          text-align: center;
          margin: 100px 0; /* Adds 100px margin above and below */
        }

        /* Title Styling */
        .logo-slider-title {
          text-align: left;
          margin-left: 90px;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        /* Outer Wrapper */
        .logo-slider {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          margin-bottom: 15px;
          margin-top: 50px;
          padding: 10px;
        }

        /* Track for Sliding Logos */
        .logo-track {
          display: flex;
          gap: 40px;
          animation: slide 15s linear infinite; /* Smooth infinite scroll */
        }

        /* Individual Logo Styling */
        .logo-img {
          height: 60px;
          filter: grayscale(100%);
          transition: filter 0.3s ease-in-out;
        }

        .logo-img:hover {
          filter: grayscale(0%);
        }

        /* Sliding Animation */
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 992px) {
          .logo-slider-title {
            font-size: 22px;
            margin-left: 50px;
          }
        }

        @media (max-width: 576px) {
          .logo-slider-title {
            font-size: 18px;
            margin-left: 30px;
          }
        }
      `}</style>
    </div>
  );
}

export default LogoSlider;
