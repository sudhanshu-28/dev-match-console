import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addUser } from "../utils/userSlice";
import { showErrorMessage, showSuccessMessage } from "../utils/notifySlice";

import UserCard from "./UserCard";

import { deepClone } from "../utils/helper";
import { BASE_URL, PROFILE_EDIT_API } from "../api-config/endpoints";

const Profile = () => {
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();

  const [userDetail, setUserDetail] = useState(null);
  const [skills, setSkills] = useState("");
  const [isUpdating, setUpdating] = useState(false);

  const handleChange = (key, value) => {
    const obj = Object.assign({}, userDetail);
    obj[key] = value;
    setUserDetail(obj);
  };

  const handleProfileUpdate = async () => {
    if (!userDetail) return;

    let payload = deepClone(userDetail);

    delete payload._id;
    delete payload.emailId;
    payload.skills = skills.split(",");

    setUpdating(true);

    await axios
      .patch(BASE_URL + PROFILE_EDIT_API, payload, { withCredentials: true })
      .then((res) => {
        const response = res?.data;
        const { success = false, data = null } = response;

        if (success && data) {
          dispatch(addUser(data));
          dispatch(showSuccessMessage("Profile updated successfully!"));
        }
      })
      .catch((err) => {
        const response = err?.response?.data;
        const { success, message } = response;
        if (!success) {
          const displayMsg =
            message || "Failed to update profile details. Please try again.";
          dispatch(showErrorMessage(displayMsg));
        }
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  useEffect(() => {
    if (user) {
      setUserDetail(user);
    }
  }, [user]);

  useEffect(() => {
    if (userDetail?.skills) {
      const commaSeparatedString = userDetail?.skills.join(",");
      setSkills(commaSeparatedString);
    }
  }, [userDetail?.skills]);

  if (!user) return;

  return (
    <div className="flex w-full flex-col lg:flex-row px-6 justify-center gap-6 py-10">
      <div className="card bg-base-300 w-full shadow-xl">
        <div className="card-body">
          {/* Title  */}
          <h2 className="card-title">{`Update Profile`}</h2>

          <div className="mt-4">
            <div className="flex w-full gap-6">
              {/* First Name */}
              <div className="w-full">
                <div className="label">
                  <span className="label-text">{`First Name`}</span>
                </div>

                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Enter First Name"
                    value={userDetail?.firstName}
                    onChange={(e) =>
                      handleChange("firstName", e?.target?.value)
                    }
                  />
                </label>
              </div>

              {/* Last Name */}
              <div className="w-full">
                <div className="label">
                  <span className="label-text">{`Last Name`}</span>
                </div>

                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Enter Last Name"
                    value={userDetail?.lastName}
                    onChange={(e) => handleChange("lastName", e?.target?.value)}
                  />
                </label>
              </div>
            </div>

            <div className="flex w-full gap-6 mt-2">
              {/* Age */}
              <div className="w-full">
                <div className="label">
                  <span className="label-text">{`Age`}</span>
                </div>

                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="number"
                    className="grow"
                    placeholder="Enter Age"
                    min={18}
                    max={120}
                    value={userDetail?.age}
                    onChange={(e) => handleChange("age", e?.target?.value)}
                  />
                </label>
              </div>

              {/* Gender */}
              <div className="w-full">
                <div className="label">
                  <span className="label-text">{`Gender`}</span>
                </div>

                <select
                  className="select select-bordered w-full"
                  value={userDetail?.gender}
                  onChange={(e) => handleChange("gender", e?.target?.value)}
                >
                  <option disabled selected={!userDetail?.gender}>
                    {`Select Gender`}
                  </option>
                  <option value="Male">{`Male`}</option>
                  <option value="Female">{`Female`}</option>
                  <option value="Other">{`Other`}</option>
                </select>
              </div>
            </div>

            {/* Profile Photo URL */}
            <div className="mt-2">
              <div className="label">
                <span className="label-text">{`Profile URL`}</span>
              </div>

              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter valid Photo URL"
                  value={userDetail?.photoUrl}
                  onChange={(e) => handleChange("photoUrl", e?.target?.value)}
                />
              </label>
            </div>

            {/* About Me */}
            <div className="mt-2">
              <div className="label">
                <span className="label-text">{`About Me`}</span>
              </div>

              <textarea
                className="textarea textarea-bordered textarea-md w-full"
                placeholder="Write a brief introduction about yourself here..."
                value={userDetail?.about}
                onChange={(e) => handleChange("about", e?.target?.value)}
              ></textarea>
            </div>

            {/* Your Skills */}
            <div className="mt-1">
              <div className="label">
                <span className="label-text">{`Skills - with comma seperated ( , )`}</span>
              </div>

              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter your Skills"
                  value={skills}
                  onChange={(e) => setSkills(e?.target?.value)}
                />
              </label>
            </div>
          </div>

          {/* Save button  */}
          <div className="flex justify-start mt-5">
            <button
              className={`btn btn-primary btn-square w-full ${
                isUpdating ? `btn-disabled` : ``
              }`}
              onClick={handleProfileUpdate}
            >
              {isUpdating && <span className="loading loading-spinner"></span>}
              {isUpdating ? `Updating...` : `Update`}
            </button>
          </div>
        </div>
      </div>

      <div className="divider lg:divider-horizontal"></div>

      <div className="card bg-base-300 w-full shadow-xl">
        <div className="card-body">
          {/* Header  */}
          <h2 className="card-title">{`Live Preview`}</h2>
          <div className="flex justify-center mt-4">
            {userDetail && <UserCard user={userDetail} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
