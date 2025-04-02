import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

const CourseCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [screenSize, setScreenSize] = useState({
    isTablet: false,
    isMobile: false,
    isSmallMobile: false,
  });

  const courses = [
    {
      id: 1,
      title: "MERN Stack Development",
      description:
        "Master MongoDB, Express.js, React, and Node.js to build full-stack web applications.",
      image:
        "https://blog.nextideatech.com/wp-content/uploads/2022/12/1_FVtCyRdJ6KOr4YswTtwMeA.jpeg",
      category: "Web Development",
      url: "/coursesDetails",
    },
    {
      id: 2,
      title: "Python Programming",
      description:
        "Learn Python from basics to advanced concepts for web development, data science, and automation.",
      image:
        "https://venus-online-software-training.com/wp-content/uploads/2023/12/Python-Symbol.png",
      category: "Programming",
      url: "/coursesDetails",
    },
    {
      id: 3,
      title: "Data Analysis",
      description:
        "Become proficient in analyzing and visualizing data to extract meaningful insights.",
      image:
        "https://www.ishir.com/wp-content/uploads/2024/01/Data-Scientist-vs-Data-Analyst-vs-Data-Engineer-ISHIR.jpg",
      category: "Data Science",
      url: "/coursesDetails",
    },
  ];

  // Handle screen size detection with useEffect to avoid SSR issues
  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize({
        isTablet: window.innerWidth <= 1024 && window.innerWidth > 768,
        isMobile: window.innerWidth <= 768 && window.innerWidth > 480,
        isSmallMobile: window.innerWidth <= 480,
      });
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleCardClick = (index) => {
    if (isAnimating || index === activeIndex) return;

    setIsAnimating(true);
    setActiveIndex(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setActiveIndex((prev) => (prev + 1) % courses.length);

        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating, courses.length]);

  // CSS in JS styles
  const styles = {
    carouselContainer: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      padding: "0 15px",
    },
    carouselTrack: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: screenSize.isSmallMobile ? "400px" : "500px",
      position: "relative",
      perspective: "1000px",
    },
    carouselCardWrapper: {
      position: "absolute",
      width: screenSize.isSmallMobile
        ? "220px"
        : screenSize.isMobile
        ? "250px"
        : "300px",
      height: screenSize.isSmallMobile
        ? "320px"
        : screenSize.isMobile
        ? "350px"
        : "400px",
      transition: "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
      cursor: "pointer",
      zIndex: 1,
    },
    leftCard: {
      transform: screenSize.isSmallMobile
        ? "translateX(-120px) scale(0.7)"
        : screenSize.isMobile
        ? "translateX(-180px) scale(0.75)"
        : screenSize.isTablet
        ? "translateX(-220px) scale(0.8)"
        : "translateX(-320px) scale(0.85)",
      zIndex: 0,
      opacity: screenSize.isSmallMobile ? 0.4 : 0.7,
    },
    rightCard: {
      transform: screenSize.isSmallMobile
        ? "translateX(120px) scale(0.7)"
        : screenSize.isMobile
        ? "translateX(180px) scale(0.75)"
        : screenSize.isTablet
        ? "translateX(220px) scale(0.8)"
        : "translateX(320px) scale(0.85)",
      zIndex: 0,
      opacity: screenSize.isSmallMobile ? 0.4 : 0.7,
    },
    activeCard: {
      transform: "translateY(-20px) scale(1.1)",
      zIndex: 2,
    },
    carouselIndicators: {
      display: "flex",
      justifyContent: "center",
      marginTop: "30px",
      gap: "10px",
    },
    carouselIndicator: {
      width: screenSize.isSmallMobile ? "10px" : "12px",
      height: screenSize.isSmallMobile ? "10px" : "12px",
      borderRadius: "50%",
      backgroundColor: "#ddd",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    activeIndicator: {
      backgroundColor: "var(--primary-color, #ff9a70)",
      transform: "scale(1.2)",
    },
    heading: {
      fontSize: screenSize.isSmallMobile
        ? "32px"
        : screenSize.isMobile
        ? "42px"
        : "50px",
      fontWeight: "lighter",
      paddingLeft: "20px",
      paddingBottom: "20px",
      paddingTop: "20px",
      textAlign: screenSize.isSmallMobile ? "center" : "left",
    },
  };

  // Function to get card wrapper style based on index
  const getCardWrapperStyle = (index) => {
    const baseStyle = styles.carouselCardWrapper;

    if (index < activeIndex) {
      return { ...baseStyle, ...styles.leftCard };
    } else if (index > activeIndex) {
      return { ...baseStyle, ...styles.rightCard };
    } else {
      return { ...baseStyle, ...styles.activeCard };
    }
  };

  return (
    <>
      <h4 style={styles.heading}>Choose your path:</h4>

      <div style={styles.carouselContainer}>
        <div style={styles.carouselTrack}>
          {courses.map((course, index) => (
            <div
              key={course.id}
              style={getCardWrapperStyle(index)}
              onClick={() => handleCardClick(index)}
            >
              <CourseCard course={course} isActive={index === activeIndex} />
            </div>
          ))}
        </div>

        <div style={styles.carouselIndicators}>
          {courses.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.carouselIndicator,
                ...(index === activeIndex && styles.activeIndicator),
              }}
              onClick={() => handleCardClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseCarousel;
