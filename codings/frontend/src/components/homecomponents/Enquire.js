import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import gsap from "gsap";

gsap.registerPlugin();

const EnquirySection = () => {
  const headingContainerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // GSAP Timeline for Headings
    if (headingContainerRef.current) {
      const headings = headingContainerRef.current.querySelectorAll("h1");
      const timeline = gsap.timeline();

      headings.forEach((heading, index) => {
        const headingText = heading.innerText;
        heading.innerHTML = "";
        const chars = [];
        const words = headingText.split(" ");

        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement("span");
          wordSpan.className = "heading-word";
          wordSpan.style.display = "inline-block";

          [...word].forEach((char) => {
            const charWrapper = document.createElement("span");
            charWrapper.className = "char-wrapper";
            charWrapper.style.overflow = "hidden";

            const charSpan = document.createElement("span");
            charSpan.className = "heading-char";
            charSpan.innerText = char;
            charSpan.style.display = "inline-block";
            charSpan.style.transform = "translateY(100%)";

            charWrapper.appendChild(charSpan);
            wordSpan.appendChild(charWrapper);
            chars.push(charSpan);
          });

          heading.appendChild(wordSpan);

          if (wordIndex < words.length - 1) {
            const spaceSpan = document.createElement("span");
            spaceSpan.innerHTML = "&nbsp;";
            spaceSpan.style.display = "inline-block";
            heading.appendChild(spaceSpan);
          }
        });

        timeline.to(
          chars,
          {
            y: 0,
            duration: 1,
            stagger: 0.03,
            ease: "power4.out",
          },
          index * 0.1
        );
      });
    }

    // GSAP Fade-in Animation for Text
    if (textRef.current) {
      const text = textRef.current;
      const textContent = text.innerText;
      text.innerHTML = ""; // Clear the original text

      const chars = [];

      // Split text into characters and wrap them in spans
      [...textContent].forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.innerHTML = char === " " ? "&nbsp;" : char;
        charSpan.className = "fade-text-char";
        charSpan.style.opacity = "0.3"; // Initially hidden
        text.appendChild(charSpan);
        chars.push(charSpan);
      });

      // GSAP Animation
      gsap.to(chars, {
        opacity: 1, // Fade in
        stagger: 0.02, // Less delay between characters
        duration: 0.3, // Shorter animation duration
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <div className="p-4 m-3">
      <Row className="align-items-center">
        <Col lg={6} className="pe-lg-5">
          <div ref={headingContainerRef}>
            <h1 className="display-4">Crack your goal</h1>
            <h1 className="display-4">with Indore's Top</h1>
            <h1 className="display-4">Educator</h1>
          </div>

          {/* Character-based reveal effect */}
          <p ref={textRef} className="lead mb-4 fw-light fade-text">
            Learn from coders, not tutors.
          </p>

          <div className="mb-4">
            <Form>
              <Row>
                <Col xs={9}>
                  <div className="input-group mb-2">
                    <span className="input-group-text bg-white border-end-0">
                      +91
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Enter your mobile number"
                      className="border-start-0"
                    />
                  </div>
                </Col>
                <Col xs={9}>
                  <Button variant="dark" className="w-100 py-3 text-white">
                    Enquire for free
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
        <Col lg={6} style={{ padding: "0px 10px 0px 0px" }}>
          <div className="building-image" style={{ padding: 0 }}>
            <img
              src="https://cdn.shopify.com/s/files/1/0070/5901/3716/files/ubiqum-coding-bootcamp.jpg?v=1686797831"
              alt="Building with MOCKUP sign"
              className="img-fluid rounded shadow-lg"
              style={{ padding: 0, margin: 0 }}
            />
          </div>
        </Col>
      </Row>

      {/* Styles for GSAP Fade Effect */}
      <style jsx>{`
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
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default EnquirySection;
