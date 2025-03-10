import { Outlet } from "react-router-dom";
import Homenav from "../components/nav";

const LandingLayout = () => {
  return (
    <>
      <Homenav />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LandingLayout;
