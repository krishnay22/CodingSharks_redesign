import { Outlet } from "react-router-dom";
import Homenav from "../components/nav";
import Footer from "../components/homecomponents/FooterForLandingpage";

const LandingLayout = () => {
  return (
    <>
      <Homenav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LandingLayout;
