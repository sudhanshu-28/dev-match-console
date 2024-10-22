import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { addUser } from "../utils/userSlice";
import { showErrorMessage, showSuccessMessage } from "../utils/notifySlice";

import { BASE_URL, SIGNUP_API } from "../api-config/endpoints";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userObj, setUserObj] = useState({
    firstName: "Test",
    lastName: "User",
    emailId: "testuser@gmail.com",
    password: "Test@123",
  });

  const [isProcessing, setProcessing] = useState(false);

  const handleChange = (key, value) => {
    const obj = Object.assign({}, userObj);
    obj[key] = value;
    setUserObj(obj);
  };

  const handleSignup = async () => {
    const requiredFields = ["firstName", "lastName", "emailId", "password"];

    if (!requiredFields.every((field) => userObj?.[field])) {
      return;
    }

    setProcessing(true);

    await axios
      .post(BASE_URL + SIGNUP_API, userObj, {
        timeout: 2000,
        withCredentials: true,
      })
      .then((res) => {
        const response = res?.data;
        const { success = false, data = null } = response;
        if (success && data) {
          dispatch(addUser(data));
          dispatch(
            showSuccessMessage("Signup complete! You are now logged in.")
          );
          navigate("/profile");
        }
      })
      .catch((err) => {
        const response = err?.response?.data;
        const { success, message } = response;
        if (!success) {
          const displayMsg = message || "Unable to signup. Please try again.";
          dispatch(showErrorMessage(displayMsg));
        }
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  return (
    <div className="flex justify-center w-full items-center">
      <div className="card bg-base-300 w-auto shadow-xl">
        <div className="card-body">
          {/* Title  */}
          <h2 className="card-title">{`Sign up to get access`}</h2>

          <div className="mt-2">
            <div className="flex w-full gap-2">
              {/* First Name */}
              <div>
                <div className="label">
                  <span className="label-text">{`First Name`}</span>
                </div>

                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Enter First Name"
                    value={userObj?.firstName}
                    onChange={(e) =>
                      handleChange("firstName", e?.target?.value)
                    }
                  />
                </label>
              </div>

              {/* Last Name */}
              <div>
                <div className="label">
                  <span className="label-text">{`Last Name`}</span>
                </div>

                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Enter Last Name"
                    value={userObj?.lastName}
                    onChange={(e) => handleChange("lastName", e?.target?.value)}
                  />
                </label>
              </div>
            </div>

            {/* Email */}
            <div className="mt-2">
              <div className="label">
                <span className="label-text">{`Email`}</span>
              </div>

              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="name@company.com"
                  value={userObj?.emailId}
                  onChange={(e) => handleChange("emailId", e?.target?.value)}
                />
              </label>
            </div>

            {/* Password */}
            <div className="mt-2">
              <div className="label">
                <span className="label-text">{`Password`}</span>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="********"
                  value={userObj?.password}
                  onChange={(e) => handleChange("password", e?.target?.value)}
                />
              </label>
            </div>
          </div>

          {/* Signup button  */}
          <div className="flex justify-start mt-3.5">
            <button
              className={`btn btn-primary btn-square w-full ${
                isProcessing ? `btn-disabled` : ``
              }`}
              onClick={handleSignup}
            >
              {isProcessing && (
                <span className="loading loading-spinner"></span>
              )}
              {isProcessing ? `Signing up...` : `Sign up`}
            </button>
          </div>

          {/* Signup  */}
          <div className="mt-2">
            <p className="text-sm">
              {`Already have an account?`}
              <Link to="/login" className=" link-primary ml-2">
                {`Sign in`}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
