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
      <h4
        className="logo-slider-title"
        style={{
          textAlign: "left",
          marginLeft: "90px",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        Our Students Work At
      </h4>
      <div
        className="logo-slider"
        style={{
          marginBottom: "15px",
          marginTop: "50px",
          padding: "10px",
        }}
      >
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
    </div>
  );
}

export default LogoSlider;
