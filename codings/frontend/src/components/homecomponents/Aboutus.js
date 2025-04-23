import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from "react-bootstrap";
import { useScrollAnimation } from "./fadeuptext";
import useRepeatScrollTextSplitting from "./hooks/textsplitting";
import CustomButton from "./Landingbutoon";

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
              <h2>Transforming Education Through Hands-on Expertise</h2>
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
                src="https://media.istockphoto.com/id/1201405341/photo/university-students-studying-with-teacher.jpg?s=2048x2048&w=is&k=20&c=NCRypRPOSZU4TRIG5tjj9yGlgiwW2gypnJUEEjmhuLA="
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
            At our coaching institute, we believe in the power of practical
            learning and personalized attention. Our approach combines hands-on
            experiences with dedicated one-on-one mentorship to ensure every
            student masters both theoretical concepts and their real-world
            applications. We continuously adapt our teaching methods based on
            industry trends and student feedback to create the most effective
            learning environment possible.
          </p>
          <div style={{ width: "300px" }}>
            <CustomButton
              text="learn More"
              accentColor="#FF9A70"
              primaryColor="#ffffff"
            />
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
          transition: opacity 1s ease-in;
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
