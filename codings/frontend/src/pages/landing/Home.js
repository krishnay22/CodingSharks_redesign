import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoSlider from "../../components/homecomponents/logoslider";
import EnquirySection from "../../components/homecomponents/Enquire";
import CommunitySection from "../../components/homecomponents/Aboutus";
import CustomVerticalScrollbar from "../../components/homecomponents/teachingMethods";
import NFTCard from "../../components/homecomponents/cards";
import ReviewSlider from "../../components/homecomponents/ReviewSlider";
import RecruitmentStories from "../../components/homecomponents/Slider";
import Footer from "../../components/homecomponents/FooterForLandingpage";
const Home = () => {
  return (
    <>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <EnquirySection />
        <div style={{ margin: "180px 0px 100px 0px" }}>
          <CommunitySection />
        </div>
        <div style={{ margin: "180px 0px 100px 0px" }}>
          <LogoSlider />
        </div>

        <div style={{ margin: "180px 0px 100px 0px" }}>
          <CustomVerticalScrollbar />
        </div>
        <div style={{ margin: "180px 0px 100px 0px" }}>
          <NFTCard />
        </div>
        <div style={{ margin: "80px 0px 80px 0px" }}>
          <RecruitmentStories />
        </div>
        <div style={{ margin: "180px 0px 80px 0px" }}>
          <ReviewSlider />
        </div>

        <div style={{ margin: "80px 0px 0px 0px" }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
