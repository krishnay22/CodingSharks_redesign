import React, { useState, useEffect, useCallback } from "react";

const RecruitmentStoriesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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

  // Advance to next slide
  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
    }
  }, [isTransitioning, stories.length]);

  // Go to previous slide
  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
    }
  }, [isTransitioning, stories.length]);

  // Handle automatic slide transitions
  useEffect(() => {
    const transitionTime = 500; // Time for slide transition animation
    const slideInterval = 3000; // Time between slides (3 seconds)

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

  const styles = {
    outerContainer: {
      position: "relative",
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "0 60px", // Space for outside buttons
      height: "500px",
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
      opacity: 0,
      visibility: "hidden",
      transition: "opacity 0.5s ease, visibility 0.5s",
    },
    activeSlide: {
      opacity: 1,
      visibility: "visible",
    },
    slide: {
      display: "flex",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      backgroundColor: "#f8f9fa",
      height: "100%",
    },
    imageContainer: {
      flex: "0 0 300px",
      marginRight: "2rem",
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
    },
    heading: {
      fontSize: "2rem",
      marginBottom: "1rem",
      color: "#333",
    },
    paragraph: {
      fontSize: "1rem",
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
      width: "50px",
      height: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      fontSize: "1.8rem",
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
  };

  const handleImageTouch = (e) => {
    e.currentTarget.style.transform = "scale(1.1)";

    // Reset after animation completes
    setTimeout(() => {
      e.currentTarget.style.transform = "scale(1)";
    }, 300);
  };

  return (
    <>
      <h2
        style={{
          padding: "80px 20px 80px 50px",
          fontSize: "55px",
          fontWeight: "lighter",
        }}
      >
        Student's who got placed by us:
      </h2>
      <div
        style={styles.outerContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div style={styles.slideWindow}>
          {stories.map((story, index) => (
            <div
              key={story.id}
              style={{
                ...styles.slideContainer,
                ...(index === activeIndex ? styles.activeSlide : {}),
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
          >
            &#10094;
          </button>
          <button
            style={{ ...styles.navButton, ...styles.rightButton }}
            onClick={nextSlide}
            disabled={isTransitioning}
          >
            &#10095;
          </button>
        </div>
      </div>
    </>
  );
};

export default RecruitmentStoriesCarousel;
