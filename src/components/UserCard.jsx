import axios from "axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { removeFeed } from "../utils/feedSlice";
import { showErrorMessage } from "../utils/notifySlice";

import { BASE_URL, REQUEST_SEND_API } from "../api-config/endpoints";

const UserCard = ({ user, isPreview = false }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    about,
    age = 25,
    gender = "Male",
  } = user;

  const dispatch = useDispatch();

  const fullName = `${firstName} ${lastName}`;

  const handleRequestSend = async (type, userId) => {
    if (!type || !userId) return;

    await axios
      .post(
        `${BASE_URL}${REQUEST_SEND_API}/${type}/${userId}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        const response = res?.data;
        const { success = false, data = null } = response;
        if (success && data) {
          dispatch(removeFeed(userId));
        }
      })
      .catch((err) => {
        const response = err?.response?.data;
        const { success, message } = response;

        if (!success) {
          const displayMsg = message || `Failed to review Connection request.`;
          dispatch(showErrorMessage(displayMsg));
        }
      });
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="w-96 h-72 overflow-hidden">
        <img
          src={photoUrl}
          alt="Profile Photo"
          className="object-fill w-full h-full"
        />
      </figure>
      <div className="card-body">
        <div className="flex flex-col gap-1">
          <h2 className="card-title text-2xl">{fullName}</h2>
          <p className="text-gray-400">{`${age ? `${age}, ` : ``}${
            gender ? `${gender}` : ``
          }`}</p>
          <p className="text-gray-500">{about}</p>
          <div className="card-actions justify-center pt-4">
            <button
              className="btn bg-red-500 text-white"
              onClick={
                isPreview ? null : () => handleRequestSend("ignore", _id)
              }
            >{`Ignore`}</button>
            <button
              className="btn bg-blue-500 text-white"
              onClick={
                isPreview ? null : () => handleRequestSend("interested", _id)
              }
            >{`Interested`}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop validation
UserCard.prototype = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    about: PropTypes.string,
    age: PropTypes.string,
    gender: PropTypes.string,
  }).isRequired,
  isPreview: PropTypes.bool,
};

export default UserCard;
