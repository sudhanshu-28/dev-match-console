import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { removeUser } from "../utils/userSlice";
import { showSuccessMessage, showErrorMessage } from "../utils/notifySlice";

import { DEFAULT_PHOTO_URL } from "../api-config/constants";
import { BASE_URL, LOGOUT_API } from "../api-config/endpoints";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store?.user);
  const { data: connectionRequests } = useSelector((store) => store?.request);

  const handleLogout = async () => {
    await axios
      .get(BASE_URL + LOGOUT_API, { withCredentials: true })
      .then((res) => {
        const response = res?.data;
        const { success = false } = response;
        if (success) {
          dispatch(removeUser());
          dispatch(showSuccessMessage("Logged out successfully!"));
          navigate("/login");
        }
      })
      .catch((error) => {
        const message =
          error?.message || "Failed to log out. Please try again.";
        dispatch(showErrorMessage(message));
      });
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">{`DevMatch`}</Link>
      </div>
      {user && (
        <div className="flex-none mx-4 gap-4">
          <span>{`Welcome, ${user?.firstName || `User`}`}</span>
          <Link
            to={"/requests"}
            className="indicator cursor-pointer btn-ghost ml-3 mr-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-sm indicator-item">
              {connectionRequests ? connectionRequests.length : 0}
            </span>
          </Link>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Photo"
                  src={user?.photoUrl || DEFAULT_PHOTO_URL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"}>{`Profile`}</Link>
              </li>
              <li>
                <Link to={"/connections"}>{`My Connections`}</Link>
              </li>
              <li onClick={handleLogout}>
                <div>{`Logout`}</div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
