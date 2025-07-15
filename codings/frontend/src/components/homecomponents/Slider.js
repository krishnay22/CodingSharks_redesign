import React, { useState, useEffect, useCallback } from "react";
import { useScrollAnimation } from "./fadeuptext";

const RecruitmentStoriesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("left"); // For tracking slide direction
  const headingRef = useScrollAnimation({
    startTrigger: 1.2, // Start animation before element enters viewport
  });
  const stories = [
    {
      id: 1,
      image:
        "https://media.istockphoto.com/id/1389017464/photo/man-wearing-button-down-shirt-and-eyeglasses-poses-for-photo.jpg?s=612x612&w=0&k=20&c=_vWOPqcocxJzG_Fpfd7zAPpDQr6EjRFF62VRfdj19TY=",
      title: "Neeraj (Amadeus)",
      content:
        "As a recent BCA graduate, Neeraj was unsure where to begin. Thanks to Coding Sharks' intensive placement training, he landed a role at Amadeus as a Junior Developer right after college.",
    },
    {
      id: 2,
      image:
        "https://img.freepik.com/premium-photo/cute-boy-wearing-pink-hoodie-looking-camera_786444-280.jpg?ga=GA1.1.546181405.1738839454&semt=ais_hybrid&w=740",
      title: "Mayur (Thoughtwin)",
      content:
        "Mayur joined Coding Sharks during his final semester. The mentorship and mock interviews gave him the edge to crack Thoughtwin’s placement drive as a Software Trainee.",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/free-photo/front-view-smiley-man-with-headphones_23-2149915902.jpg?ga=GA1.1.546181405.1738839454&semt=ais_hybrid&w=740", // Optional: replace this image with a male photo if needed
      title: "Vijay (Mindruby)",
      content:
        "Vijay always dreamed of working in tech but lacked direction. Coding Sharks helped him build real-world projects and ace technical interviews. He’s now a fresher engineer at Mindruby.",
    },
  ];

  // Check if viewport is mobile
  const [isMobile, setIsMobile] = useState(false);

  // Update device type on window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Advance to next slide
  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setDirection("left");
      setActiveIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
    }
  }, [isTransitioning, stories.length]);

  // Go to previous slide
  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setDirection("right");
      setActiveIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
    }
  }, [isTransitioning, stories.length]);

  // Handle automatic slide transitions
  useEffect(() => {
    const transitionTime = 500; // Time for slide transition animation
    const slideInterval = 5000; // Time between slides (5 seconds)

    let slideTimer;

    // Reset transition state after animation completes
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, transitionTime);

    // Set up automatic slide changes if not paused
    if (!isPaused) {
      slideTimer = setTimeout(() => {
        nextSlide();
      }, slideInterval);
    }

    // Cleanup on unmount or state change
    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(slideTimer);
    };
  }, [activeIndex, isPaused, nextSlide]);

  const getSlideStyle = (index) => {
    // Current slide is visible and centered
    if (index === activeIndex) {
      return {
        transform: "translateX(0)",
        opacity: 1,
        zIndex: 1,
      };
    }

    // Handle different directions for smooth animation
    if (direction === "left") {
      // Next slide is off to the right, waiting to come in
      if (
        index === activeIndex + 1 ||
        (activeIndex === stories.length - 1 && index === 0)
      ) {
        return {
          transform: "translateX(100%)",
          opacity: 1,
          zIndex: 0,
        };
      }
      // Previous slide moves off to the left
      return {
        transform: "translateX(-100%)",
        opacity: 1,
        zIndex: 0,
      };
    } else {
      // Previous slide is off to the left, waiting to come in
      if (
        index === activeIndex - 1 ||
        (activeIndex === 0 && index === stories.length - 1)
      ) {
        return {
          transform: "translateX(-100%)",
          opacity: 1,
          zIndex: 0,
        };
      }
      // Next slide moves off to the right
      return {
        transform: "translateX(100%)",
        opacity: 1,
        zIndex: 0,
      };
    }
  };

  const styles = {
    outerContainer: {
      position: "relative",
      maxWidth: isMobile ? "90%" : "1100px", // Reduced width for mobile
      margin: "0 auto",
      padding: isMobile ? "0 30px" : "0 60px",
      height: isMobile ? "auto" : "220px",
    },
    slideWindow: {
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden", // Hide other slides
    },
    slideContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transition: "transform 0.5s ease",
    },
    slide: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row", // Stack vertically on mobile
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      backgroundColor: "#f8f9fa",
      height: "100%",
    },
    imageContainer: {
      flex: isMobile ? "0 0 250px" : "0 0 300px",
      marginRight: isMobile ? "0" : "2rem",
      marginBottom: isMobile ? "1rem" : "0",
      overflow: "hidden",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.3s ease",
      cursor: "pointer",
    },
    contentSection: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: isMobile ? "1rem" : "0",
    },
    heading: {
      fontSize: isMobile ? "1.5rem" : "2rem",
      marginBottom: "1rem",
      color: "#333",
    },
    paragraph: {
      fontSize: isMobile ? "0.9rem" : "1rem",
      lineHeight: "1.6",
      color: "#555",
    },
    navButtons: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      padding: "0",
      zIndex: 2,
      left: 0,
    },
    navButton: {
      backgroundColor: "#ff996e",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: isMobile ? "40px" : "50px",
      height: isMobile ? "40px" : "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      fontSize: isMobile ? "1.4rem" : "1.8rem",
      transition: "background-color 0.3s ease",
      position: "absolute",
    },
    leftButton: {
      left: isMobile ? "10px" : "0",
      transform: isMobile ? "none" : "translateX(-50%)",
    },
    rightButton: {
      right: isMobile ? "10px" : "0",
      transform: isMobile ? "none" : "translateX(50%)",
    },
    indicators: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },
    indicator: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      margin: "0 5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  const handleImageTouch = (e) => {
    e.currentTarget.style.transform = "scale(1.1)";

    // Reset after animation completes
    setTimeout(() => {
      e.currentTarget.style.transform = "scale(1)";
    }, 300);
  };

  // Adjust slide height for mobile view
  const slideHeight = isMobile
    ? activeIndex !== null
      ? "500px"
      : "auto"
    : "500px";

  return (
    <>
      <h2
        ref={headingRef}
        style={{
          opacity: 0,
          transform: "translateY(200px)",
          transition: "transform 0.2s ease-out, opacity 0.8s ease-out",
          padding: isMobile ? "40px 20px 30px 20px" : "40px 20px 60px 50px",
          fontSize: isMobile ? "32px" : "50px",
          fontWeight: "lighter",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        Students who got placed by us:
      </h2>
      <div
        style={{
          ...styles.outerContainer,
          height: slideHeight,
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          style={{
            ...styles.slideWindow,
            height: slideHeight,
          }}
        >
          {stories.map((story, index) => (
            <div
              key={story.id}
              style={{
                ...styles.slideContainer,
                ...getSlideStyle(index),
                height: slideHeight,
              }}
            >
              <div style={styles.slide}>
                <div style={styles.imageContainer}>
                  <img
                    src={story.image}
                    alt={`${story.title} profile`}
                    style={styles.image}
                    onClick={handleImageTouch}
                    onTouchStart={handleImageTouch}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
                <div style={styles.contentSection}>
                  <h2 style={styles.heading}>{story.title}</h2>
                  <p style={styles.paragraph}>{story.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.navButtons}>
          <button
            style={{ ...styles.navButton, ...styles.leftButton }}
            onClick={prevSlide}
            disabled={isTransitioning}
            aria-label="Previous slide"
          >
            &#10094;
          </button>
          <button
            style={{ ...styles.navButton, ...styles.rightButton }}
            onClick={nextSlide}
            disabled={isTransitioning}
            aria-label="Next slide"
          >
            &#10095;
          </button>
        </div>

        {/* Add indicators for mobile view */}
        {isMobile && (
          <div style={styles.indicators}>
            {stories.map((_, index) => (
              <div
                key={index}
                style={{
                  ...styles.indicator,
                  backgroundColor: index === activeIndex ? "#ff996e" : "#ddd",
                }}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setDirection(index > activeIndex ? "left" : "right");
                    setActiveIndex(index);
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RecruitmentStoriesCarousel;
