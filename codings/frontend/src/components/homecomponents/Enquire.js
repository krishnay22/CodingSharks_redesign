import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import gsap from "gsap";
import CustomButton from "./Landingbutoon";

gsap.registerPlugin();

const EnquirySection = () => {
  const headingContainerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
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
          { y: 0, duration: 1, stagger: 0.03, ease: "power4.out" },
          index * 0.1
        );
      });
    }

    if (textRef.current) {
      const text = textRef.current;
      const textContent = text.innerText;
      text.innerHTML = "";
      const chars = [];
      [...textContent].forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.innerHTML = char === " " ? "&nbsp;" : char;
        charSpan.className = "fade-text-char";
        charSpan.style.opacity = "0.3";
        text.appendChild(charSpan);
        chars.push(charSpan);
      });
      gsap.to(chars, {
        opacity: 1,
        stagger: 0.02,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  // Building image component to be reused
  const BuildingImage = () => (
    <div className="building-image mb-4">
      <img
        src="https://cdn.shopify.com/s/files/1/0070/5901/3716/files/ubiqum-coding-bootcamp.jpg?v=1686797831"
        alt="Building with MOCKUP sign"
        className="img-fluid rounded shadow-lg"
      />
    </div>
  );

  return (
    <Container fluid>
      <div className="enquiry-section p-3 p-md-4 my-2 my-md-3">
        <Row className="align-items-center">
          <Col lg={6} className="pe-lg-4 mb-4 mb-lg-0">
            <div ref={headingContainerRef} className="heading-container">
              <h1 className="heading-text">Crack your goal</h1>
              <h1 className="heading-text">with Indore's Top</h1>
              <h1 className="heading-text">Educator</h1>
            </div>
            <p
              ref={textRef}
              className="lead mb-4 fw-light fade-text"
              style={{ color: "#FF9A70" }}
            >
              Learn from coders, not tutors.
            </p>

            {/* Mobile image - shown only on xs and sm screens */}
            <div className="d-block d-md-none">
              <BuildingImage />
            </div>

            <div className="mb-4">
              <Form>
                <Row>
                  <Col xs={12} md={9} className="mb-3">
                    <div className="input-group">
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
                  <Col xs={12} md={9}>
                    <div className="button-wrapper">
                      <CustomButton
                        text="Enquire for free"
                        accentColor="#212529"
                        primaryColor="#ffffff"
                        className="w-100 py-2 py-md-3"
                      />
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>

          {/* Desktop image - shown only on md screens and up */}
          <Col lg={6} className="d-none d-md-block">
            <BuildingImage />
          </Col>
        </Row>
      </div>
      <style jsx>{`
        .enquiry-section {
          overflow-x: hidden;
        }
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
        .heading-text {
          font-size: calc(2rem + 1.5vw);
          line-height: 1.2;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        .lead {
          font-size: calc(1.2rem + 0.5vw);
          font-weight: 400;
        }
        .building-image {
          border-radius: 12px;
          overflow: hidden;
        }
        .building-image img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 12px;
          transition: transform 0.3s ease;
        }
        .input-group-text,
        .form-control {
          padding: 0.6rem 1rem;
          font-size: 1rem;
          opacity: 0.6;
          border: 1px solid;
          border-radius: 10px;
        }
        /* Remove focus effect */
        .form-control:focus,
        .input-group:focus-within .form-control,
        .input-group:focus-within .input-group-text {
          outline: none !important;
          border-color: inherit !important;
          box-shadow: none !important;
        }

        /* Media Queries */
        @media (max-width: 767px) {
          .heading-text {
            font-size: calc(1.8rem + 1vw);
          }
          .lead {
            font-size: calc(1rem + 0.5vw);
          }
          .input-group-text,
          .form-control {
            padding: 0.5rem 0.8rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 575px) {
          .heading-text {
            font-size: calc(1.5rem + 1vw);
          }
          .lead {
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }
          .enquiry-section {
            padding: 1rem !important;
          }
        }
      `}</style>
    </Container>
  );
};

export default EnquirySection;
