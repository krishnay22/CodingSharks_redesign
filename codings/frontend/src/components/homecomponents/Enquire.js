import React, { useEffect, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
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

  return (
    <div className="p-4 m-3">
      <Row className="align-items-center">
        <Col lg={6} className="pe-lg-5" style={{ paddingTop: "30px" }}>
          <div ref={headingContainerRef} style={{ margin: 0, padding: 0 }}>
            <h1 className="display-4">Crack your goal</h1>
            <h1 className="display-4">with Indore's Top</h1>
            <h1 className="display-4">Educator</h1>
          </div>
          <p
            ref={textRef}
            className="lead mb-4 fw-light fade-text"
            style={{ color: "#FF9A70" }}
          >
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
                  <CustomButton
                    text="Enquire for free"
                    accentColor="#212529"
                    primaryColor="#ffffff"
                    className="w-100 py-3"
                  />
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
        <Col lg={6} style={{ padding: "0px 10px 0px 0px" }}>
          <div className="building-image">
            <img
              src="https://cdn.shopify.com/s/files/1/0070/5901/3716/files/ubiqum-coding-bootcamp.jpg?v=1686797831"
              alt="Building with MOCKUP sign"
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </Col>
      </Row>
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
        .navbar-nav .nav-link {
          margin: 0 15px;
          font-size: 1.1rem;
        }
        .display-4 {
          font-size: 3.3rem;
          line-height: 1.2;
          font-weight: 800;
        }
        .lead {
          font-size: 1.8rem;
          font-weight: 400;
        }
        .building-image img {
          border-radius: 12px;
          width: 100%;
          height: 100%;
        }
        .input-group-text,
        .form-control {
          padding: 0.6rem 1rem;
          font-size: 1rem;
          opacity: 0.6;
          border: 1px solid;
          border-radius: 10px;
        }
        /* ❌ Remove focus effect completely */
        .form-control:focus,
        .input-group:focus-within .form-control,
        .input-group:focus-within .input-group-text {
          outline: none !important;
          border-color: inherit !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
};

export default EnquirySection;
