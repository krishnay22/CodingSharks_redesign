import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const AboutUs = () => {
  return (
    <Container className="about-us-section py-5 my-5">
      <Row className="align-items-center">
        <Col lg={6} className="mb-4 mb-lg-0">
          <div className="about-text">
            <h5 className="small-heading mb-3">About us</h5>
            <h2 className="main-heading mb-5">
              A Community of Faith, Learning and Life
            </h2>
          </div>
        </Col>
        <Col lg={6}>
          <div className="image-container mb-4">
            {/* Replace with your actual image */}
            <img
              src="https://via.placeholder.com/600x400"
              alt="Marcellin College"
              className="img-fluid border"
            />
          </div>
          <div className="about-content">
            <p className="mb-4">
              At Marcellin College, we understand that a successful school must
              adapt and change, constantly evolve and 'dare to create something
              new'. Our innovative approach to education is informed by
              evidence-based learning and teaching that sits within our Catholic
              and Marist framework
            </p>
            <div className="text-end">
              <Button variant="light" className="learn-more-btn px-4 py-2">
                Learn More
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
