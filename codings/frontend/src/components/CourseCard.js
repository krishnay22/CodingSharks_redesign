import React, { useState, useEffect } from "react";

const CourseCard = ({ course, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  const styles = {
    courseCard: {
      width: "100%",
      height: "100%",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      backgroundColor: "white",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      position: "relative",
    },
    active: {
      boxShadow: "0 15px 35px rgba(255, 154, 112, 0.3)",
    },
    hovered: {
      transform: "translateY(-10px)",
      boxShadow: "0 20px 40px rgba(255, 154, 112, 0.4)",
    },
    cardContent: {
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardImageContainer: {
      width: "100%",
      height: "60%",
      position: "relative",
      overflow: "hidden",
    },
    cardImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    hoveredCardImage: {
      transform: "scale(1.05)",
    },
    cardOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    hoveredCardOverlay: {
      opacity: 1,
    },
    cardDetails: {
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      backgroundColor: "white",
    },
    cardCategory: {
      fontSize: "12px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      color: "#ff9a70",
      marginBottom: "8px",
      fontWeight: 600,
      opacity: 0,
      transform: "translateY(10px)",
      transition: "all 0.3s ease",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: 700,
      color: "#333",
      marginBottom: "10px",
      opacity: 0,
      transform: "translateY(10px)",
      transition: "all 0.3s ease",
      transitionDelay: "0.1s",
    },
    cardDescription: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "15px",
      flexGrow: 1,
      opacity: 0,
      transform: "translateY(10px)",
      transition: "all 0.3s ease",
      transitionDelay: "0.2s",
    },
    cardButton: {
      padding: "10px 20px",
      backgroundColor: "#ff9a70",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      opacity: 0,
      transform: "translateY(10px)",
      transitionDelay: "0.3s",
      alignSelf: "flex-start",
      textDecoration: "none",
      display: "inline-block",
    },
    cardButtonHover: {
      backgroundColor: "#ff8a57",
      transform: "translateY(-3px)",
      boxShadow: "0 5px 15px rgba(255, 154, 112, 0.4)",
    },
    visible: {
      opacity: 1,
      transform: "translateY(0)",
    },
    // Media queries can be applied with JavaScript conditionally
    smallScreen: {
      cardTitle: {
        fontSize: "16px",
      },
      cardDescription: {
        fontSize: "13px",
      },
      cardButton: {
        padding: "8px 16px",
        fontSize: "13px",
      },
    },
  };

  // Determine if we should use small screen styles
  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

  // Combine styles based on component state
  const courseCardStyle = {
    ...styles.courseCard,
    ...(isActive && styles.active),
    ...(isHovered && styles.hovered),
  };

  const cardImageStyle = {
    ...styles.cardImage,
    ...(isHovered && styles.hoveredCardImage),
  };

  const cardOverlayStyle = {
    ...styles.cardOverlay,
    ...(isHovered && styles.hoveredCardOverlay),
  };

  // Apply visible styles to card elements when visible is true
  const categoryStyle = {
    ...styles.cardCategory,
    ...(isVisible && styles.visible),
    ...(isSmallScreen && styles.smallScreen.cardCategory),
  };

  const titleStyle = {
    ...styles.cardTitle,
    ...(isVisible && styles.visible),
    ...(isSmallScreen && styles.smallScreen.cardTitle),
  };

  const descriptionStyle = {
    ...styles.cardDescription,
    ...(isVisible && styles.visible),
    ...(isSmallScreen && styles.smallScreen.cardDescription),
  };

  const buttonStyle = {
    ...styles.cardButton,
    ...(isVisible && styles.visible),
    ...(isSmallScreen && styles.smallScreen.cardButton),
  };

  // Function to handle button hover state
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const combinedButtonStyle = {
    ...buttonStyle,
    ...(isButtonHovered && styles.cardButtonHover),
  };

  return (
    <div
      style={courseCardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.cardContent}>
        <div style={styles.cardImageContainer}>
          <img
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            style={cardImageStyle}
          />
          <div style={cardOverlayStyle}></div>
        </div>

        <div style={styles.cardDetails}>
          <span style={categoryStyle}>{course.category}</span>
          <h3 style={titleStyle}>{course.title}</h3>
          <p style={descriptionStyle}>{course.description}</p>
          <a
            href={course.url}
            style={combinedButtonStyle}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
