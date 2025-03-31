import "bootstrap/dist/css/bootstrap.min.css";
import LogoSlider from "../../components/homecomponents/logoslider";
import EnquirySection from "../../components/homecomponents/Enquire";
import CommunitySection from "../../components/homecomponents/Aboutus";
import ReviewSlider from "../../components/homecomponents/ReviewSlider";
import RecruitmentStories from "../../components/homecomponents/Slider";
import Footer from "../../components/homecomponents/FooterForLandingpage";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <EnquirySection />

      <div className="my-32">
        <CommunitySection />
      </div>
      <div>
        <LogoSlider />
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
