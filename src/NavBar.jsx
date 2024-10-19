import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DEFAULT_PHOTO_URL =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

const NavBar = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store?.user);

  const BACKEND_URL = "http://localhost:7777";
  const LOGOUT_API = "/auth/logout";

  const handleLogout = async () => {
    await axios
      .get(BACKEND_URL + LOGOUT_API, { withCredentials: true })
      .then((res) => {
        const response = res?.data;
        const { success = false } = response;
        if (success) {
          navigate("/login");
        }
      })
      .catch(() => {});
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevMatch</a>
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
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
