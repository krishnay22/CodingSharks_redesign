import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

const CourseCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Changed initial activeIndex to 0 to make the first card active initially
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
      url: "/MERNStackCourseDetails",
    },
    {
      id: 2,
      title: "Python Programming",
      description:
        "Learn Python from basics to advanced concepts for web development, data science, and automation.",
      image:
        "https://venus-online-software-training.com/wp-content/uploads/2023/12/Python-Symbol.png",
      category: "Programming",
      url: "/PythonCoursesDetails",
    },
    {
      id: 3,
      title: "Data Analysis",
      description:
        "Become proficient in analyzing and visualizing data to extract meaningful insights.",
      image:
        "https://www.ishir.com/wp-content/uploads/2024/01/Data-Scientist-vs-Data-Analyst-vs-Data-Engineer-ISHIR.jpg",
      category: "Data Science",
      url: "/DataAnalystCourseDetails",
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
      justifyContent: "center", // Changed to center to display all cards equally
      alignItems: "center",
      minHeight: screenSize.isSmallMobile ? "400px" : "500px",
      position: "relative",
      perspective: "1000px",
      flexWrap: "wrap", // Added flexWrap to allow cards to wrap on smaller screens
      gap: "20px", // Added gap between cards
    },
    carouselCardWrapper: {
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
      zIndex: 1, // All cards will have the same zIndex
      transform: "translateY(-20px) scale(1.0)", // Applied the "active" style to all cards, adjusted scale slightly
    },
    carouselIndicators: {
      display: "none", // Hide indicators if there's no active card
    },
    carouselIndicator: {
      display: "none", // Hide indicators if there's no active card
    },
    activeIndicator: {
      display: "none", // Hide indicators if there's no active card
    },
    heading: {
      fontSize: screenSize.isSmallMobile
        ? "32px"
        : screenSize.isMobile
        ? "42px"
        : "50px",
      fontWeight: "lighter",
      paddingLeft: "36px",
      paddingBottom: "20px",
      paddingTop: "20px",
      textAlign: screenSize.isSmallMobile ? "center" : "left",
    },
  };

  // Function to get card wrapper style - simplified to always return the desired "active" look
  const getCardWrapperStyle = () => {
    return { ...styles.carouselCardWrapper };
  };

  return (
    <>
      <h4 style={styles.heading}>Choose your path:</h4>

      <div style={styles.carouselContainer}>
        <div style={styles.carouselTrack}>
          {courses.map((course) => (
            <div
              key={course.id}
              style={getCardWrapperStyle()} // Always apply the "active" style
            >
              {/* Pass isActive as true if you want the CourseCard component to also apply an active style */}
              <CourseCard course={course} isActive={true} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseCarousel;
