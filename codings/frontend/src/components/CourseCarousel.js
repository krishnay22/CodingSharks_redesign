import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

const CourseCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const courses = [
    {
      id: 1,
      title: "MERN Stack Development",
      description:
        "Master MongoDB, Express.js, React, and Node.js to build full-stack web applications.",
      image:
        "https://blog.nextideatech.com/wp-content/uploads/2022/12/1_FVtCyRdJ6KOr4YswTtwMeA.jpeg",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Python Programming",
      description:
        "Learn Python from basics to advanced concepts for web development, data science, and automation.",
      image:
        "https://venus-online-software-training.com/wp-content/uploads/2023/12/Python-Symbol.png",
      category: "Programming",
    },
    {
      id: 3,
      title: "Data Analysis",
      description:
        "Become proficient in analyzing and visualizing data to extract meaningful insights.",
      image:
        "https://www.ishir.com/wp-content/uploads/2024/01/Data-Scientist-vs-Data-Analyst-vs-Data-Engineer-ISHIR.jpg",
      category: "Data Science",
    },
  ];

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
  }, [isAnimating]);

  // CSS in JS styles
  const styles = {
    carouselContainer: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
    },
    carouselTrack: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "500px",
      position: "relative",
      perspective: "1000px",
    },
    carouselCardWrapper: {
      position: "absolute",
      width: "300px",
      height: "400px",
      transition: "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
      cursor: "pointer",
      zIndex: 1,
    },
    leftCard: {
      transform: "translateX(-320px) scale(0.85)",
      zIndex: 0,
      opacity: 0.7,
    },
    rightCard: {
      transform: "translateX(320px) scale(0.85)",
      zIndex: 0,
      opacity: 0.7,
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
      width: "12px",
      height: "12px",
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
    // Media query styles to be applied conditionally
    tablet: {
      leftCard: {
        transform: "translateX(-220px) scale(0.8)",
      },
      rightCard: {
        transform: "translateX(220px) scale(0.8)",
      },
    },
    mobile: {
      carouselCardWrapper: {
        width: "250px",
        height: "350px",
      },
      leftCard: {
        transform: "translateX(-180px) scale(0.75)",
      },
      rightCard: {
        transform: "translateX(180px) scale(0.75)",
      },
    },
    smallMobile: {
      carouselTrack: {
        minHeight: "400px",
      },
      carouselCardWrapper: {
        width: "220px",
        height: "320px",
      },
      leftCard: {
        opacity: 0.4,
        transform: "translateX(-120px) scale(0.7)",
      },
      rightCard: {
        opacity: 0.4,
        transform: "translateX(120px) scale(0.7)",
      },
    },
  };

  // Determine screen size for responsive styling
  const isTablet = window.matchMedia("(max-width: 1024px)").matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const isSmallMobile = window.matchMedia("(max-width: 480px)").matches;

  // Function to get card wrapper styles based on index and screen size
  const getCardWrapperStyle = (index) => {
    let cardStyle = { ...styles.carouselCardWrapper };

    // Apply responsive styles based on screen size
    if (isSmallMobile) {
      cardStyle = { ...cardStyle, ...styles.smallMobile.carouselCardWrapper };
    } else if (isMobile) {
      cardStyle = { ...cardStyle, ...styles.mobile.carouselCardWrapper };
    }

    // Apply position styles based on index relative to active index
    if (index < activeIndex) {
      if (isSmallMobile) {
        return { ...cardStyle, ...styles.smallMobile.leftCard };
      } else if (isMobile) {
        return { ...cardStyle, ...styles.mobile.leftCard };
      } else if (isTablet) {
        return { ...cardStyle, ...styles.tablet.leftCard };
      } else {
        return { ...cardStyle, ...styles.leftCard };
      }
    } else if (index > activeIndex) {
      if (isSmallMobile) {
        return { ...cardStyle, ...styles.smallMobile.rightCard };
      } else if (isMobile) {
        return { ...cardStyle, ...styles.mobile.rightCard };
      } else if (isTablet) {
        return { ...cardStyle, ...styles.tablet.rightCard };
      } else {
        return { ...cardStyle, ...styles.rightCard };
      }
    } else {
      return { ...cardStyle, ...styles.activeCard };
    }
  };

  // Get track style based on screen size
  const getTrackStyle = () => {
    if (isSmallMobile) {
      return { ...styles.carouselTrack, ...styles.smallMobile.carouselTrack };
    }
    return styles.carouselTrack;
  };

  return (
    <>
      <h4
        style={{
          fontSize: "60px",
          fontWeight: "lighter",
          paddingLeft: "20px",
          paddingBottom: "20px",
        }}
      >
        Choose Your path:
      </h4>

      <div style={styles.carouselContainer}>
        <div style={getTrackStyle()}>
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
