import React, { useRef, useEffect } from "react";

const CustomButton = ({
  text,
  icon,
  accentColor,
  primaryColor,
  isNavButton = false,
}) => {
  const buttonRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      // Update button rectangle on resize if needed
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (circleRef.current && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      circleRef.current.style.top = `${e.clientY - buttonRect.y}px`;
      circleRef.current.style.left = `${e.clientX - buttonRect.x}px`;
    }
  };

  const buttonStyle = {
    "--accent-color": accentColor || "#fefbe0",
    "--primary-color": primaryColor || "#0e100f",
  };

  return (
    <>
      <div
        className={`custom-button ${isNavButton ? "c-btn" : ""}`}
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        style={buttonStyle}
      >
        <div className="circle" ref={circleRef}></div>
        {icon ? <i className={`bi bi-${icon}`}></i> : <span>{text}</span>}
      </div>

      <style jsx>{`
        .custom-button {
          --accent-color: #fefbe0;
          --primary-color: #0e100f;
          display: grid;
          place-items: center;
          position: relative;
          border: 1px solid var(--accent-color);
          border-radius: 2.5rem;
          background-color: var(--primary-color);
          height: auto;
          width: 100%;
          padding-inline: 1.5rem;
          padding-block: 0.5rem;
          overflow: hidden;
          cursor: pointer;
        }

        .custom-button:hover .circle {
          scale: 1;
          transition: scale 0.25s ease-in-out;
        }

        .custom-button:hover span,
        .custom-button:hover i {
          color: var(--primary-color);
          text-align: center;
        }

        .custom-button .circle {
          position: absolute;
          width: 175%;
          aspect-ratio: 1;
          background-color: var(--accent-color);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transform-origin: 0% 0%;
          scale: 0;
          transition: scale 0.2s ease-in-out, top 0.5s ease;
          pointer-events: none;
        }

        .custom-button span,
        .custom-button i {
          position: relative;
          color: var(--accent-color);
          font-size: ;
          font-weight: ;
          transition: 0.1s ease;
        }

        /* Navigation button styling */
        .custom-button.c-btn {
          padding: 0;
          height: 4em;
          width: 4em;
        }

        /* Custom-button container */
        .custom-button-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .custom-button-nav {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 0.5em;
        }
      `}</style>
    </>
  );
};

export default CustomButton;
