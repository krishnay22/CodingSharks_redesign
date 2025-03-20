import React from "react";
import Review from "./reviews";

export default function ReviewSlider() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            padding: "80px 20px 0px 50px",
            fontSize: "55px",
            fontWeight: "lighter",
          }}
        >
          What Our Alumni Say About Us:
        </h2>
        <p
          style={{
            padding: "0px 20px 80px 50px",
            fontWeight: "lighter",
          }}
        >
          Why Students Choose Coding Sharks
        </p>
      </div>

      <div
        className="slider"
        style={{
          "--width": "650px",
          "--height": "250px", // Decreased slider height
          "--item-height": "400px", // Keep item height at 400px
          "--quantity": "6",
          "--animation-duration": "30s",
        }}
      >
        <div className="list">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="item"
              style={{ "--position": index + 1 }}
            >
              <Review />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider {
          width: 100%;
          height: var(--height); /* Smaller slider height */
          overflow: hidden;
          display: flex;
          align-items: center; /* Center items vertically */
          mask-image: linear-gradient(
            to right,
            transparent,
            #000 10% 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            #000 10% 90%,
            transparent
          );
        }

        .slider .list {
          display: flex;
          width: 100%;
          min-width: calc(var(--width) * var(--quantity));
          position: relative;
          height: var(--height); /* Keep it small */
          align-items: center; /* Center items */
        }

        .slider .list .item {
          width: var(--width);
          height: var(--item-height); /* Keep item height at 400px */
          position: absolute;
          left: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: slideRightToLeft var(--animation-duration) linear infinite;
          transition: filter 0.5s;
          animation-delay: calc(
            (var(--animation-duration) / var(--quantity)) *
              (var(--position) - 1) - var(--animation-duration)
          ) !important;
        }

        @keyframes slideRightToLeft {
          from {
            left: 100%;
          }
          to {
            left: calc(var(--width) * -1);
          }
        }

        .slider:hover .item {
          animation-play-state: paused !important;
          filter: grayscale(1);
        }

        .slider .item:hover {
          filter: grayscale(0);
        }
      `}</style>
    </>
  );
}
