import "bootstrap/dist/css/bootstrap.min.css";
import LogoSlider from "../../components/homecomponents/logoslider";
import EnquirySection from "../../components/homecomponents/Enquire";
import CommunitySection from "../../components/homecomponents/Aboutus";
import GoogleReviewsSlider from "../../components/homecomponents/GoogleReviews";
import RecruitmentStories from "../../components/homecomponents/Slider";
import UseCases from "../../components/homecomponents/teachingMethods";
import CourseCarousel from "../../components/CourseCarousel";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <EnquirySection />
      <LogoSlider />
      <div className="my-32" style={{ padding: "0px 0px 40px 0px" }}>
        <CommunitySection />
      </div>
      <UseCases />
      <div style={{ padding: "40px 0px 0px 0px" }}>
        <CourseCarousel />
      </div>

      <div className="my-32">
        <RecruitmentStories />
      </div>

      <div className="my-32">
        <GoogleReviewsSlider />
      </div>
    </div>
  );
};

export default Home;
