import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";

const TeachingMethodsPage = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [contentScrolled, setContentScrolled] = useState(false);
  const scrollbarRef = useRef(null);
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);
  const continueScrollRef = useRef(null);

  useEffect(() => {
    // Function to handle initial scroll to position the title in the middle
    const handleMainScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const triggerPosition = windowHeight / 2; // Middle of the screen

      // Check if the wrapper is in position (title at middle of the screen)
      if (wrapperRef.current) {
        const wrapperRect = wrapperRef.current.getBoundingClientRect();
        const titlePosition = wrapperRect.top + wrapperRect.height * 0.2; // Approximate position of title

        // If title is at or past middle, fix the position and allow content scrolling
        if (titlePosition <= triggerPosition && !contentScrolled) {
          if (!isFixed) {
            setIsFixed(true);

            // Initialize the content scroll
            if (contentRef.current) {
              contentRef.current.scrollTop = 0;
            }
          }
        } else if (contentScrolled) {
          // Once content is fully scrolled, allow page to continue scrolling
          setIsFixed(false);

          // Check if we've scrolled past the continue section
          if (continueScrollRef.current) {
            const continueRect =
              continueScrollRef.current.getBoundingClientRect();
            // If we've scrolled past, reset the scrollbar
            if (continueRect.top < 0) {
              setScrollPercentage(0);
            }
          }
        } else if (titlePosition > triggerPosition) {
          // Reset if scrolling back up
          setIsFixed(false);
          setContentScrolled(false);
          setScrollPercentage(0);
        }
      }
    };

    // Function to handle the content scrolling
    const handleContentScroll = () => {
      if (isFixed && contentRef.current) {
        const scrollHeight = contentRef.current.scrollHeight;
        const clientHeight = contentRef.current.clientHeight;
        const scrollTop = contentRef.current.scrollTop;

        // Only calculate if we have room to scroll
        if (scrollHeight > clientHeight) {
          // Calculate scroll percentage
          const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
          const percentage = Math.min(scrolled, 100);
          setScrollPercentage(percentage);

          // Check if content is fully scrolled
          if (percentage >= 99.5) {
            setContentScrolled(true);
            document.body.style.overflow = ""; // Re-enable page scrolling
          }
        } else {
          setScrollPercentage(0);
        }
      }
    };

    // Handle scroll events for the main window and content
    window.addEventListener("scroll", handleMainScroll);
    if (contentRef.current) {
      contentRef.current.addEventListener("scroll", handleContentScroll);
    }

    // Handle wheel events to control scrolling behavior
    const handleWheel = (e) => {
      if (isFixed && contentRef.current) {
        const scrollHeight = contentRef.current.scrollHeight;
        const clientHeight = contentRef.current.clientHeight;
        const scrollTop = contentRef.current.scrollTop;

        // If scrolling down and we're at the bottom of content
        if (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight - 1) {
          // Allow the page to continue scrolling
          setContentScrolled(true);
          document.body.style.overflow = "";
          return;
        }

        // If we're fixed but not fully scrolled, intercept wheel events
        if (!contentScrolled) {
          contentRef.current.scrollTop += e.deltaY;
          e.preventDefault();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    // Initial checks
    handleMainScroll();

    // Clean up event listeners
    return () => {
      window.removeEventListener("scroll", handleMainScroll);
      window.removeEventListener("wheel", handleWheel);
      if (contentRef.current) {
        contentRef.current.removeEventListener("scroll", handleContentScroll);
      }
      document.body.style.overflow = "";
    };
  }, [isFixed, contentScrolled]);

  // Handle click on the scrollbar
  const handleScrollbarClick = (e) => {
    if (!scrollbarRef.current || !contentRef.current) return;

    const scrollbarHeight = scrollbarRef.current.clientHeight;
    const clickPosition = e.nativeEvent.offsetY;
    const clickPercentage = (clickPosition / scrollbarHeight) * 100;

    // Get the inverted percentage (since we're displaying from bottom)
    const invertedPercentage = 100 - clickPercentage;

    // Apply to the content scrollable area
    const scrollHeight = contentRef.current.scrollHeight;
    const clientHeight = contentRef.current.clientHeight;
    const scrollDistance = scrollHeight - clientHeight;

    // Set the scroll position based on the click
    contentRef.current.scrollTop = (invertedPercentage / 100) * scrollDistance;

    // If user clicks at the very top of scrollbar, consider content fully scrolled
    if (clickPercentage <= 1) {
      setContentScrolled(true);
      document.body.style.overflow = "";
    }
  };

  // Teaching methods data
  const leftColumnMethods = [
    {
      title: "Interactive Learning",
      description:
        "Engage students through hands-on activities and discussions.",
    },
    {
      title: "Project-Based Learning",
      description:
        "Students learn by working on real-world projects and challenges.",
    },
    {
      title: "Personalized Instruction",
      description:
        "Tailored approaches to meet individual student needs and learning styles.",
    },
    {
      title: "Collaborative Learning",
      description:
        "Students work together to solve problems and complete tasks.",
    },
  ];

  const rightColumnMethods = [
    {
      title: "Flipped Classroom",
      description:
        "Students review content at home and practice in class with teacher guidance.",
    },
    {
      title: "Inquiry-Based Learning",
      description:
        "Students learn by asking questions and investigating to find answers.",
    },
    {
      title: "Technology Integration",
      description:
        "Using digital tools and resources to enhance the learning experience.",
    },
  ];

  const additionalContent = [
    {
      title: "Our Approach",
      description:
        "Our teaching methods are designed to create a dynamic, engaging learning environment where students are active participants in their educational journey. We believe in fostering critical thinking, creativity, and a love for lifelong learning.",
    },
    {
      title: "Research-Based Methods",
      description:
        "All our teaching methods are grounded in educational research and best practices. We continuously update our approaches based on the latest findings in pedagogy and cognitive science.",
    },
    {
      title: "Assessment and Feedback",
      description:
        "We use a variety of assessment methods to gauge student understanding and provide meaningful feedback that helps them grow and improve.",
    },
  ];

  return (
    <div className="position-relative">
      {/* Space before the content to allow scrolling to the trigger position */}
      <div style={{ height: "100vh" }}></div>

      {/* Main content wrapper */}
      <div
        ref={wrapperRef}
        className={`d-flex ${
          isFixed ? "position-fixed top-0 left-0 right-0" : ""
        }`}
        style={{
          height: "100vh",
          width: "100%",
          zIndex: 10,
        }}
      >
        {/* Left section with title */}
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            width: "275px",
            height: "100vh",
          }}
        >
          <h2 className="fw-bold text-center">Our teaching methods</h2>
        </div>

        {/* Center scrollbar */}
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            width: "50px",
            height: "100vh",
          }}
        >
          {/* Custom Scrollbar */}
          <div
            className="position-relative"
            style={{ height: "50%" }}
            onClick={handleScrollbarClick}
            ref={scrollbarRef}
          >
            <div
              style={{
                width: "4px",
                height: "100%",
                backgroundColor: "#dee2e6",
                borderRadius: "9999px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  width: "100%",
                  backgroundColor: "#fd7e14",
                  borderRadius: "9999px",
                  height: `${scrollPercentage}%`,
                  transition: "height 0.3s",
                }}
              />
            </div>
          </div>
        </div>

        {/* Scrollable content area */}
        <div
          ref={contentRef}
          className="flex-grow-1 overflow-auto py-4 px-3"
          style={{
            height: "100vh",
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
        >
          {/* Hide scrollbar for Chrome, Safari and Opera */}
          <style>
            {`
              #scrollable-content::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          <Container fluid>
            <Row>
              {/* Left column */}
              <Col md={6} className="mb-4">
                {leftColumnMethods.map((method, index) => (
                  <Card
                    key={`left-${index}`}
                    className="mb-4"
                    style={{ minHeight: "160px" }}
                  >
                    <Card.Body>
                      <Card.Title>{method.title}</Card.Title>
                      <Card.Text>{method.description}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Col>

              {/* Right column */}
              <Col md={6} className="mb-4">
                {rightColumnMethods.map((method, index) => (
                  <Card
                    key={`right-${index}`}
                    className="mb-4"
                    style={{ minHeight: "160px" }}
                  >
                    <Card.Body>
                      <Card.Title>{method.title}</Card.Title>
                      <Card.Text>{method.description}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>

            {/* Additional content */}
            <Row className="mt-2">
              <Col xs={12}>
                {additionalContent.map((content, index) => (
                  <Card key={`additional-${index}`} className="mb-4">
                    <Card.Body>
                      <Card.Title>{content.title}</Card.Title>
                      <Card.Text>{content.description}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Reference div to detect when user scrolls past the teaching methods section */}
      <div ref={continueScrollRef} style={{ height: "1px" }}></div>

      {/* Space after the content to allow the page to continue scrolling */}
      <div style={{ height: "100vh" }}></div>
    </div>
  );
};

export default TeachingMethodsPage;
