import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";

const TeachingMethodsPage = () => {
  const [scrollPercentage, setScrollPercentage] = useState(50);

  useEffect(() => {
    // Function to calculate and update scroll percentage
    const handleScroll = () => {
      const scrollableElement = document.getElementById("scrollable-content");
      if (scrollableElement) {
        const scrollHeight = scrollableElement.scrollHeight;
        const scrollTop = scrollableElement.scrollTop;
        const clientHeight = scrollableElement.clientHeight;

        // Calculate scroll percentage
        const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollPercentage(Math.min(scrolled, 100));
      }
    };

    // Attach scroll event listener
    const scrollableElement = document.getElementById("scrollable-content");
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
      // Initial calculation
      handleScroll();
    }

    // Clean up event listener
    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
    <div className="d-flex vh-100">
      {/* Left sidebar with title and scrollbar */}
      <div
        className="border-end d-flex flex-column align-items-center justify-content-center"
        style={{ width: "250px" }}
      >
        <h2 className="fw-bold mb-4">Our teaching methods</h2>

        {/* Custom Scrollbar */}
        <div className="position-relative" style={{ height: "50%" }}>
          <div
            style={{
              width: "4px",
              height: "100%",
              backgroundColor: "#dee2e6",
              borderRadius: "9999px",
              overflow: "hidden",
              position: "relative",
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

      {/* Main content area with scrollable divs */}
      <div
        id="scrollable-content"
        className="flex-grow-1 overflow-auto py-4 px-3"
      >
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
  );
};

export default TeachingMethodsPage;
