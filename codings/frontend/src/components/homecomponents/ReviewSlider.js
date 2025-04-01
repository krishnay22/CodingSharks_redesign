import React, { useEffect, useState } from "react";
import Review from "./reviews";
import { useScrollAnimation } from "./fadeuptext";

export default function ReviewSlider() {
  const headingRef = useScrollAnimation({
    startTrigger: 1.2, // Start animation before element enters viewport
  });

  // Add responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Update device type on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
      setIsTablet(window.innerWidth >= 576 && window.innerWidth < 992);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive values
  const sliderWidth = isMobile ? "350px" : isTablet ? "500px" : "650px";
  const headingFontSize = isMobile ? "32px" : isTablet ? "42px" : "55px";
  const headingPadding = isMobile
    ? "40px 10px 0px 10px"
    : isTablet
    ? "60px 15px 0px 30px"
    : "80px 20px 0px 50px";
  const subtitlePadding = isMobile
    ? "0px 10px 40px 10px"
    : isTablet
    ? "0px 15px 60px 30px"
    : "0px 20px 80px 50px";
  const sliderHeight = isMobile ? "200px" : isTablet ? "220px" : "250px";
  const itemHeight = isMobile ? "300px" : isTablet ? "350px" : "400px";
  const animationDuration = isMobile ? "25s" : "30s";

  return (
    <>
      <div
        ref={headingRef}
        style={{
          opacity: 0,
          transform: "translateY(200px)",
          transition: "transform 0.2s ease-out, opacity 0.8s ease-out",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            padding: headingPadding,
            fontSize: headingFontSize,
            fontWeight: "lighter",
          }}
        >
          What Our Alumni Say About Us:
        </h2>
        <p
          style={{
            padding: subtitlePadding,
            fontWeight: "lighter",
            fontSize: isMobile ? "14px" : "16px",
          }}
        >
          Why Students Choose Coding Sharks
        </p>
      </div>

      <div
        className="slider"
        style={{
          "--width": sliderWidth,
          "--height": sliderHeight,
          "--item-height": itemHeight,
          "--quantity": isMobile ? "4" : "6",
          "--animation-duration": animationDuration,
        }}
      >
        <div className="list">
          {[...Array(isMobile ? 4 : 6)].map((_, index) => (
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
          height: var(--height);
          overflow: hidden;
          display: flex;
          align-items: center;
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
          height: var(--height);
          align-items: center;
        }

        .slider .list .item {
          width: var(--width);
          height: var(--item-height);
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

        /* Pause animations on hover for non-touch devices only */
        @media (hover: hover) {
          .slider:hover .item {
            animation-play-state: paused !important;
            filter: grayscale(1);
          }

          .slider .item:hover {
            filter: grayscale(0);
          }
        }

        /* Additional responsive styles */
        @media (max-width: 576px) {
          .slider {
            mask-image: linear-gradient(
              to right,
              transparent,
              #000 5% 95%,
              transparent
            );
            -webkit-mask-image: linear-gradient(
              to right,
              transparent,
              #000 5% 95%,
              transparent
            );
          }
        }
      `}</style>
    </>
  );
}
