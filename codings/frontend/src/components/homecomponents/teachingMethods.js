import React, { useEffect, useRef } from "react";

const UseCases = () => {
  const containerRef = useRef(null);

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

  // Inline styles object
  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      width: "100%",
      overflowY: "auto",
      fontFamily: "'Arial', sans-serif",
      scrollBehavior: "smooth",
      position: "relative",
      // Hide scrollbar for different browsers while maintaining functionality
      scrollbarWidth: "none", // Firefox
      msOverflowStyle: "none", // IE and Edge
      "&::-webkit-scrollbar": {
        // For Chrome, Safari, and Opera
        display: "none",
      },
    },
    leftContent: {
      width: "40%",
      maxWidth: "500px",
      padding: "0 40px",
      position: "sticky",
      top: "0",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    leftTitle: {
      fontSize: "4rem",
      color: "#333",
      marginBottom: "20px",
      fontWeight: "600",
    },
    leftDescription: {
      fontSize: "1.2rem",
      color: "#555",
      lineHeight: "1.6",
    },
    rightContent: {
      width: "60%",
      padding: "60px 40px",
      display: "flex",
      flexDirection: "column",
      gap: "40px",
    },
    card: {
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
      minHeight: "200px",
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
      fontSize: "1.2rem",
      marginBottom: "10px",
      fontWeight: "500",
    },
    cardTitle: {
      fontSize: "2rem",
      marginBottom: "20px",
      fontWeight: "600",
      color: "#333",
    },
    icons: {
      display: "flex",
      gap: "15px",
      position: "absolute",
      right: "40px",
      top: "40%",
    },
    icon: {
      fontSize: "1.8rem",
      width: "40px",
      height: "40px",
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

  // Function to handle card hover
  const [presentationHover, setPresentationHover] = React.useState(false);
  const [blogHover, setBlogHover] = React.useState(false);
  const [socialHover, setSocialHover] = React.useState(false);
  const [docsHover, setDocsHover] = React.useState(false);

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
