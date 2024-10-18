import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
  return (
    <>
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Body;
