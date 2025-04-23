import React, { useEffect, useRef, useState } from "react";

const TeachingMethods = () => {
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
      .teaching-methods-container::-webkit-scrollbar {
        display: none;
      }
      .teaching-methods-container {
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
  const [practicalHover, setPracticalHover] = useState(false);
  const [mentorshipHover, setMentorshipHover] = useState(false);
  const [projectHover, setProjectHover] = useState(false);
  const [assessmentHover, setAssessmentHover] = useState(false);

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
      fontSize: isMobile ? "1.5rem" : "3rem",
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
    practicalCard: {
      backgroundColor: "#FFF8ED",
    },
    practicalCategory: {
      color: "#FF9500",
    },
    mentorshipCard: {
      backgroundColor: "#F8F0FF",
    },
    mentorshipCategory: {
      color: "#A259FF",
    },
    projectCard: {
      backgroundColor: "#F0FFE9",
    },
    projectCategory: {
      color: "#64D836",
    },
    assessmentCard: {
      backgroundColor: "#E9F6FF",
    },
    assessmentCategory: {
      color: "#36A2D8",
    },
  };

  return (
    <div
      style={styles.container}
      ref={containerRef}
      className="teaching-methods-container"
    >
      <div style={styles.leftContent}>
        <h1 style={styles.leftTitle}>Our Teaching Methods</h1>
        <p style={styles.leftDescription}>
          Experience accelerated growth through our hands-on learning approach
          and personalized one-on-one mentorship programs designed for your
          success.
        </p>
      </div>

      <div style={styles.rightContent}>
        <div
          style={{
            ...styles.card,
            ...styles.practicalCard,
            ...(practicalHover ? styles.cardHover : {}),
          }}
          onMouseEnter={() => setPracticalHover(true)}
          onMouseLeave={() => setPracticalHover(false)}
        >
          <span style={{ ...styles.category, ...styles.practicalCategory }}>
            Hands-on Learning
          </span>
          <h2 style={styles.cardTitle}>Learn by doing, not just listening</h2>
        </div>

        <div
          style={{
            ...styles.card,
            ...styles.mentorshipCard,
            ...(mentorshipHover ? styles.cardHover : {}),
          }}
          onMouseEnter={() => setMentorshipHover(true)}
          onMouseLeave={() => setMentorshipHover(false)}
        >
          <span style={{ ...styles.category, ...styles.mentorshipCategory }}>
            One-on-One Mentorship
          </span>
          <h2 style={styles.cardTitle}>Personalized guidance from experts</h2>
        </div>

        <div
          style={{
            ...styles.card,
            ...styles.projectCard,
            ...(projectHover ? styles.cardHover : {}),
          }}
          onMouseEnter={() => setProjectHover(true)}
          onMouseLeave={() => setProjectHover(false)}
        >
          <span style={{ ...styles.category, ...styles.projectCategory }}>
            Real-world Projects
          </span>
          <h2 style={styles.cardTitle}>Build your portfolio while learning</h2>
        </div>

        <div
          style={{
            ...styles.card,
            ...styles.assessmentCard,
            ...(assessmentHover ? styles.cardHover : {}),
          }}
          onMouseEnter={() => setAssessmentHover(true)}
          onMouseLeave={() => setAssessmentHover(false)}
        >
          <span style={{ ...styles.category, ...styles.assessmentCategory }}>
            Continuous Assessment
          </span>
          <h2 style={styles.cardTitle}>
            Track progress with personal feedback
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TeachingMethods;
