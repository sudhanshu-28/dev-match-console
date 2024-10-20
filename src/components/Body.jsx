import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";

import { addUser } from "../utils/userSlice";
import { BASE_URL, PROFILE_VIEW_API } from "../api-config/endpoints";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const LOGIN_PATH = "/login";
  const currentPath = location.pathname;

  const userData = useSelector((store) => store?.user);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(BASE_URL + PROFILE_VIEW_API, {
        withCredentials: true,
      });

      const res = response?.data;
      const { success = false, data = null } = res;

      if (success && data) {
        dispatch(addUser(data));
      }
    } catch (error) {
      if (error?.status === 401) {
        navigate("/login");
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!userData && currentPath !== LOGIN_PATH) {
      fetchUserDetails();
    }
  }, [userData, currentPath]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex-grow flex justify-center items-center bg-base-200">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Body;
