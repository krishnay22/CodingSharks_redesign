import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Landing.css";
import LogoSlider from "../../components/homecomponents/logoslider";
import EnquirySection from "../../components/homecomponents/Enquire";

const Home = () => {
  return (
    <>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <EnquirySection />
        <div style={{ margin: "180px 0px 100px 0px" }}>
          <LogoSlider />
        </div>
      </div>
    </>
  );
};

export default Home;
