import React, { useState, useEffect } from "react";

const CustomVerticalScrollbar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Calculate scroll percentage when the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate how far the user has scrolled as a percentage
      const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollPercentage(Math.min(scrolled, 100));
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Generate initial value
    handleScroll();

    // Clean up the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ pointerEvents: "none" }}
    >
      <div className="relative" style={{ width: "200px", height: "80%" }}>
        {/* Using your provided CSS class */}
        <div className="accessory_progress_container">
          <div
            style={{
              width: "4px",
              height: "100%",
              backgroundColor: "#e5e7eb",
              borderRadius: "9999px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "0",
                width: "100%",
                backgroundColor: "#f97316", // orange-500
                borderRadius: "9999px",
                height: `${scrollPercentage}%`,
                transition: "height 0.3s",
              }}
            />
          </div>
        </div>

        {/* CSS styles */}
        <style jsx>{`
          .accessory_progress_container {
            position: absolute;
            height: 100%;
            top: 0;
            left: -15px;
            padding: 0;
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            width: 60px;
          }
        `}</style>
      </div>

      {/* Create some dummy content to enable scrolling */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <div style={{ height: "500vh" }}></div>
      </div>
    </div>
  );
};

export default CustomVerticalScrollbar;
