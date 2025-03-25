import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from "react-bootstrap";
import { useScrollAnimation } from "./fadeuptext";
import useRepeatScrollTextSplitting from "./hooks/textsplitting";

const CommunitySection = () => {
  const [imageVisible, setImageVisible] = useState(false);

  // Scroll animation for text
  const { headingContainerRef, textRef, isAnimationComplete } =
    useRepeatScrollTextSplitting({
      threshold: 0.2,
      headingStagger: 0.02,
      headingDuration: 0.8,
    });

  // Scroll animation for the image
  const imageAnimationRef = useScrollAnimation({
    startTrigger: 0.9,
    endTrigger: 0.3,
    startY: 50,
    endY: 0,
  });

  // Effect to trigger image visibility after text animation completes
  useEffect(() => {
    if (isAnimationComplete) {
      setImageVisible(true);
    }
  }, [isAnimationComplete]);

  return (
    <div className="p-5">
      <Row className="align-items-center">
        <Col md={5}>
          <div className="mb-4">
            <h6 className="text-muted">About us</h6>
            <div ref={headingContainerRef}>
              <h2 className="display-4 fw-bold">
                A Community of Faith, Learning and Life
              </h2>
            </div>
          </div>
        </Col>
        <Col md={7}>
          <div className="bg-light h-100">
            <div
              ref={imageAnimationRef}
              className={`w-100 h-100 ${
                imageVisible ? "fade-in" : "opacity-0"
              }`}
            >
              <img
                src="https://imgs.search.brave.com/EoeTizQs1xhS4UZ-oAaq0ClZpU4LEmiIzB54Dr0irBo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTI1/NDA5ODA5L3Bob3Rv/L3RlYWNoZXItYW5k/LXN0dWRlbnRzLWlu/LWNsYXNzcm9vbS1k/dXJpbmctbGVzc29u/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1TTDJtT19YbDU4/SUtZY2N2WDVzX0FH/UGRYSmtFRjRMMGRN/Z3RSVk9qS0FVPQ"
                alt="Teacher helping students with technology"
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 6 }}>
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

      {/* Full CSS at the Bottom */}
      <style jsx>{`
        /* General Styles */
        .custom-paragraph {
          font-size: 14px;
          font-weight: 300;
          color: #6c757d;
          line-height: 1.6;
        }

        /* Image fade-in effect */
        .fade-in {
          opacity: 1;
          transition: opacity 1.5s ease-in;
        }
        .opacity-0 {
          opacity: 0;
        }

        /* Styles for text animation */
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
