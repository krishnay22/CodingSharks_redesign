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
      title: "James' Tech Journey",
      content:
        "After years in traditional corporate roles, James found his perfect match through our specialized recruitment process. Now a Senior Developer at TechInnovate, he led a key product feature that increased customer satisfaction by 27%.",
    },
    {
      id: 2,
      image:
        "https://images.squarespace-cdn.com/content/v1/592738c58419c2fe84fbdb81/1513536870219-95REEICPQ2RYHOPD7NC4/Louis_web_0031.jpg?format=1000w",
      title: "Sarah's Leadership Success",
      content:
        "Sarah was seeking a challenging role that would use her strategic skills. We placed her as a Product Manager at InnovateTech, where she now leads a team of 15 and has overseen a 40% increase in product adoption.",
    },
    {
      id: 3,
      image:
        "https://media.istockphoto.com/id/1279504799/photo/businesswomans-portrait.jpg?s=612x612&w=0&k=20&c=I-54ajKgmxkY8s5-myHZDv_pcSCveaoopf1DH3arv0k=",
      title: "Michael's Career Transformation",
      content:
        "After 12 years in finance, Michael wanted a change. Our team helped him transition to a FinTech startup where his industry knowledge proved invaluable. Six months in, he's already been promoted to Head of Strategy.",
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
      maxWidth: "1100px",
      margin: "0 auto",
      padding: isMobile ? "0 30px" : "0 60px", // Reduced padding for mobile
      height: isMobile ? "auto" : "500px",
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
      left: "0",
      transform: "translateX(-50%)",
    },
    rightButton: {
      right: "0",
      transform: "translateX(50%)",
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
          padding: isMobile ? "40px 20px 30px 20px" : "80px 20px 60px 50px",
          fontSize: isMobile ? "32px" : "55px",
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
