import React, { useEffect, useRef, useState } from "react";

const UseCases = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Optional: Add smooth scrolling effect
  useEffect(() => {
    const container = containerRef.current;
    let isScrolling = false;
    let scrollTimeout;

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        container.classList.add("is-scrolling");
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        container.classList.remove("is-scrolling");
      }, 100);
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Add styles to hide scrollbar
  useEffect(() => {
    // Create a style element
    const style = document.createElement("style");
    // Add CSS rules to hide scrollbar
    style.textContent = `
      .use-cases-container::-webkit-scrollbar {
        display: none;
      }
      .use-cases-container {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    // Append style to document head
    document.head.appendChild(style);

    // Clean up
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Function to handle card hover
  const [presentationHover, setPresentationHover] = useState(false);
  const [blogHover, setBlogHover] = useState(false);
  const [socialHover, setSocialHover] = useState(false);
  const [docsHover, setDocsHover] = useState(false);

  // Responsive styles object
  const styles = {
    container: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      height: "100vh",
      width: "100%",
      overflowY: "auto",
      fontFamily: "'Arial', sans-serif",
      scrollBehavior: "smooth",
      position: "relative",
      scrollbarWidth: "none", // Firefox
      msOverflowStyle: "none", // IE and Edge
    },
    leftContent: {
      width: isMobile ? "100%" : "40%",
      maxWidth: isMobile ? "none" : "500px",
      padding: isMobile ? "40px 20px" : "0 40px",
      position: isMobile ? "relative" : "sticky",
      top: "0",
      height: isMobile ? "auto" : "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    leftTitle: {
      fontSize: isMobile ? "2.5rem" : "4rem",
      color: "#333",
      marginBottom: "20px",
      fontWeight: "600",
    },
    leftDescription: {
      fontSize: isMobile ? "1rem" : "1.2rem",
      color: "#555",
      lineHeight: "1.6",
    },
    rightContent: {
      width: isMobile ? "100%" : "60%",
      padding: isMobile ? "20px" : "60px 40px",
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "20px" : "40px",
    },
    card: {
      padding: isMobile ? "25px 20px" : "40px",
      borderRadius: "20px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
      minHeight: isMobile ? "150px" : "200px",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    cardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    },
    category: {
      fontSize: isMobile ? "1rem" : "1.2rem",
      marginBottom: "10px",
      fontWeight: "500",
    },
    cardTitle: {
      fontSize: isMobile ? "1.5rem" : "2rem",
      marginBottom: "20px",
      fontWeight: "600",
      color: "#333",
      paddingRight: isMobile ? "60px" : "0",
    },
    icons: {
      display: "flex",
      gap: isMobile ? "8px" : "15px",
      position: "absolute",
      right: isMobile ? "20px" : "40px",
      top: isMobile ? "25px" : "40%",
    },
    icon: {
      fontSize: isMobile ? "1.4rem" : "1.8rem",
      width: isMobile ? "30px" : "40px",
      height: isMobile ? "30px" : "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    presentationCard: {
      backgroundColor: "#FFF8ED",
    },
    presentationCategory: {
      color: "#FF9500",
    },
    blogCard: {
      backgroundColor: "#F8F0FF",
    },
    blogCategory: {
      color: "#A259FF",
    },
    socialCard: {
      backgroundColor: "#F0FFE9",
    },
    socialCategory: {
      color: "#64D836",
    },
    docsCard: {
      backgroundColor: "#E9F6FF",
    },
    docsCategory: {
      color: "#36A2D8",
    },
  };

  return (
    <div
      style={styles.container}
      ref={containerRef}
      className="use-cases-container"
    >
      <div style={styles.leftContent}>
        <h1 style={styles.leftTitle}>Use cases</h1>
        <p style={styles.leftDescription}>
          Captivate your audience with auto-generated infographics, diagrams,
          flowcharts, and more.
        </p>
      </div>

      <div style={styles.rightContent}>
        <div
          style={{
            ...styles.card,
            ...styles.presentationCard,
            ...(presentationHover ? styles.cardHover : {}),
          }}
          onMouseEnter={() => setPresentationHover(true)}
          onMouseLeave={() => setPresentationHover(false)}
        >
          <span style={{ ...styles.category, ...styles.presentationCategory }}>
            Presentations
          </span>
          <h2 style={styles.cardTitle}>Make impactful slides</h2>
          <div style={styles.icons}>
            <div style={styles.icon}>📄</div>
            <div style={styles.icon}>🎯</div>
            <div style={styles.icon}>📊</div>
          </div>
        </div>

        <div
          style={{
            ...styles.card,
            ...styles.blogCard,
            ...(blogHover ? styles.cardHover : {}),
          }}
          onMouseEnter={() => setBlogHover(true)}
          onMouseLeave={() => setBlogHover(false)}
        >
          <span style={{ ...styles.category, ...styles.blogCategory }}>
            Blog
          </span>
          <h2 style={styles.cardTitle}>Leave an impression</h2>
          <div style={styles.icons}>
            <div style={styles.icon}>⏺️</div>
            <div style={styles.icon}>🔖</div>
          </div>
        </div>

        <div
          style={{
            ...styles.card,
            ...styles.socialCard,
            ...(socialHover ? styles.cardHover : {}),
          }}
          onMouseEnter={() => setSocialHover(true)}
          onMouseLeave={() => setSocialHover(false)}
        >
          <span style={{ ...styles.category, ...styles.socialCategory }}>
            Social Media
          </span>
          <h2 style={styles.cardTitle}>Engage your audience</h2>
        </div>

        <div
          style={{
            ...styles.card,
            ...styles.docsCard,
            ...(docsHover ? styles.cardHover : {}),
          }}
          onMouseEnter={() => setDocsHover(true)}
          onMouseLeave={() => setDocsHover(false)}
        >
          <span style={{ ...styles.category, ...styles.docsCategory }}>
            Docs
          </span>
          <h2 style={styles.cardTitle}>Write easy to read docs</h2>
        </div>
      </div>
    </div>
  );
};

export default UseCases;
