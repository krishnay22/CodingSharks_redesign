import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const CommunitySection = () => {
  return (
    <div className="p-5">
      <Row className="align-items-center">
        <Col md={5}>
          <div className="mb-4">
            <h6 className="text-muted">About us</h6>
            <h2 className="display-4 fw-bold">
              A Community of Faith, Learning and Life
            </h2>
          </div>
        </Col>
        <Col md={7}>
          <div className="bg-light h-100">
            <img
              src="https://media.istockphoto.com/id/1430133631/photo/young-teacher-helping-teenager-students-at-college-learning-technology-and-science-in.jpg?s=612x612&w=0&k=20&c=6l6irCGKHe9ggxMeD5QbS4fvIdsTLsmg8HZbpMsYFVE="
              alt="Teacher helping students with technology"
              className="w-100 h-100 object-fit-cover"
            />
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 6 }}>
          <p className="custom-paragraph">
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
          font-size: 14px; /* Makes text smaller */
          font-weight: 300; /* Makes text lighter */
          color: #6c757d; /* Bootstrap's muted gray color */
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default CommunitySection;
