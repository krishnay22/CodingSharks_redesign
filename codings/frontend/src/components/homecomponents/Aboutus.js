import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useScrollAnimation } from "./fadeuptext";
import useRepeatScrollTextSplitting from "./hooks/textsplitting"; // Import the new hook

const CommunitySection = () => {
  // Use the scroll animation hook for the image
  const imageAnimationRef = useScrollAnimation({
    startTrigger: 0.9,
    endTrigger: 0.3,
    startY: 50,
    endY: 0,
  });

  // Use the repeat scroll text splitting hook for the heading
  const { headingContainerRef, textRef } = useRepeatScrollTextSplitting({
    threshold: 0.2, // Trigger when 20% of the element is visible
    headingStagger: 0.02,
    headingDuration: 0.8,
  });

  return (
    <div className="p-5">
      <Row className="align-items-center">
        <Col md={5}>
          <div className="mb-4">
            <h6 className="text-muted">About us</h6>
            {/* Wrap the heading in a container with the ref */}
            <div ref={headingContainerRef}>
              <h2 className="display-4 fw-bold">
                A Community of Faith, Learning and Life
              </h2>
            </div>
          </div>
        </Col>
        <Col md={7}>
          <div className="bg-light h-100">
            <div ref={imageAnimationRef} className="w-100 h-100">
              <img
                src="https://media.istockphoto.com/id/1430133631/photo/young-teacher-helping-teenager-students-at-college-learning-technology-and-science-in.jpg?s=612x612&w=0&k=20&c=6l6irCGKHe9ggxMeD5QbS4fvIdsTLsmg8HZbpMsYFVE="
                alt="Teacher helping students with technology"
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 6 }}>
          {/* You can also apply the text animation to this paragraph */}
          <p ref={textRef} className="custom-paragraph">
            At Marcellin College, we understand that a successful school must
            adapt and change, constantly evolve and 'dare to create something
            new'. Our innovative approach to education is informed by
            evidence-based learning and teaching that sits within our Catholic
            and Marist framework.
          </p>
          <div className="mt-4 text-left">
            <Button variant="outline-secondary" size="lg" className="px-5">
              Learn More
            </Button>
          </div>
        </Col>
      </Row>

      {/* Custom Styles */}
      <style jsx>{`
        .custom-paragraph {
          font-size: 14px;
          font-weight: 300;
          color: #6c757d;
          line-height: 1.6;
        }

        /* Styles needed for the text splitting animation */
        .char-wrapper {
          display: inline-block;
          overflow: hidden;
        }
        .heading-char {
          display: inline-block;
          transform-origin: bottom center;
        }
        .heading-word {
          white-space: nowrap;
        }
        .fade-text-char {
          display: inline-block;
          font-weight: 300;
        }
      `}</style>
    </div>
  );
};

export default CommunitySection;
