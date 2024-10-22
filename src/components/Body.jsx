import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";

import NavBar from "./NavBar";
import Footer from "./Footer";

import { addUser } from "../utils/userSlice";
import { clearMessage } from "../utils/notifySlice";

import {
  addConnectionRequests,
  completeFetchingConnectionRequests,
  startFetchingConnectionRequests,
} from "../utils/requestSlice";
import {
  BASE_URL,
  PROFILE_VIEW_API,
  REQUEST_RECEIVED_API,
} from "../api-config/endpoints";

import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "colored",
  transition: Zoom,
};

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const GUEST_ROUTES = ["/login", "/signup"];
  const currentPath = location.pathname;

  const userData = useSelector((store) => store?.user);
  const notifyData = useSelector((store) => store?.notify);
  const { data: requestData } = useSelector((store) => store?.request);

  const triggerToastAutomatically = (notifyData) => {
    const { type = null, message } = notifyData;

    switch (type) {
      case "success":
        toast.success(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      default:
        break;
    }

    // Dispatch to clear the message after showing the toast
    dispatch(clearMessage());
  };

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

  const fetchConnectionRequests = async () => {
    dispatch(startFetchingConnectionRequests());

    await axios
      .get(BASE_URL + REQUEST_RECEIVED_API, { withCredentials: true })
      .then((res) => {
        const response = res?.data;
        const { success = false, data = null } = response;
        if (success && data && data.length !== 0) {
          dispatch(addConnectionRequests(data));
        }
      })
      .catch((err) => {
        console.error(err?.message || err);
      })
      .finally(() => {
        dispatch(completeFetchingConnectionRequests());
      });
  };

  useEffect(() => {
    if (!userData && !GUEST_ROUTES.includes(currentPath)) {
      fetchUserDetails();
    }
  }, [userData, currentPath]);

  useEffect(() => {
    if (!requestData && !GUEST_ROUTES.includes(currentPath)) {
      fetchConnectionRequests();
    }
  }, [userData, currentPath]);

  useEffect(() => {
    if (notifyData) {
      triggerToastAutomatically(notifyData);
    }
  }, [notifyData]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex-grow flex bg-base-200">
        <ToastContainer />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Body;
