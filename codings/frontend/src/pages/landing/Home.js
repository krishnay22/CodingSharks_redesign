import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoSlider from "../../components/homecomponents/logoslider";
import EnquirySection from "../../components/homecomponents/Enquire";
import CommunitySection from "../../components/homecomponents/Aboutus";
import NFTCard from "../../components/homecomponents/cards";
import ReviewSlider from "../../components/homecomponents/ReviewSlider";
import RecruitmentStories from "../../components/homecomponents/Slider";
import Footer from "../../components/homecomponents/FooterForLandingpage";

const Home = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <EnquirySection />

      <div className="my-32">
        <CommunitySection />
      </div>

      {/* Parallax NFT Card Over LogoSlider */}
      <div className="relative w-full h-screen overflow-hidden">
        <div
          style={{
            transform: `translateY(${offset}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <LogoSlider />
        </div>

        <div>
          <NFTCard />
        </div>
      </div>

      <div className="my-32">
        <RecruitmentStories />
      </div>

      <div className="my-32">
        <ReviewSlider />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
