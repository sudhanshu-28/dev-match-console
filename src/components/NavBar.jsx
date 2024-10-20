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
      <div className="flex-none mx-4 gap-4">
        {user && <span>{`Welcome, ${user?.firstName || `User`}`}</span>}
        {user && (
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
              <li onClick={handleLogout}>
                <div>{`Logout`}</div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
