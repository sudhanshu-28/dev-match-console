import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { addConnectionRequests } from "../utils/requestSlice";

import {
  BASE_URL,
  REQUEST_ACCEPT_API,
  REQUEST_RECEIVED_API,
  REQUEST_REJECT_API,
} from "../api-config/endpoints";
import { showErrorMessage, showSuccessMessage } from "../utils/notifySlice";

const Requests = () => {
  const dispatch = useDispatch();

  const { data: connectionRequests } = useSelector((store) => store?.request);

  const fetchConnectionRequests = async () => {
    await axios
      .get(BASE_URL + REQUEST_RECEIVED_API, { withCredentials: true })
      .then((res) => {
        const response = res?.data;
        const { success = false, data = null } = response;
        if (success && data) {
          dispatch(addConnectionRequests(data));
        }
      })
      .catch((err) => {
        console.error(err?.message || err);
      });
  };

  const handleRequestAccept = async (connectionId) => {
    await axios
      .post(
        `${BASE_URL}${REQUEST_ACCEPT_API}/${connectionId}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        const response = res?.data;
        const { success = false, data = null, message } = response;
        if (success && data) {
          fetchConnectionRequests();
          dispatch(showSuccessMessage(message));
        }
      })
      .catch((err) => {
        const response = err?.response?.data;
        const { success, message } = response;
        if (!success) {
          const displayMsg = message || "Failed to accept Connection request.";
          dispatch(showErrorMessage(displayMsg));
        }
      });
  };

  const handleRequestReject = async (connectionId) => {
    await axios
      .post(
        `${BASE_URL}${REQUEST_REJECT_API}/${connectionId}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        const response = res?.data;
        const { success = false, data = null, message } = response;
        if (success && data) {
          fetchConnectionRequests();
          dispatch(showSuccessMessage(message));
        }
      })
      .catch((err) => {
        const response = err?.response?.data;
        const { success, message } = response;
        if (!success) {
          const displayMsg = message || "Failed to reject Connection request.";
          dispatch(showErrorMessage(displayMsg));
        }
      });
  };

  return (
    <div className="w-full flex justify-center text-gray-700">
      <div className="w-1/2  rounded-xl bg-base-300 my-6">
        <div className="p-5">
          <h1 className="text-lg text-start items-center">{`Connection Requests`}</h1>
        </div>
        <div className="border-t border-gray-800"></div>

        {connectionRequests && connectionRequests.length !== 0 ? (
          <>
            {connectionRequests.map((record) => {
              const { _id: connectionId, fromUserId } = record;
              const {
                _id: userId,
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
              } = fromUserId;

              const fullName = `${firstName} ${lastName}`;

              return (
                <div key={userId} className="p-5 flex flex-col gap-4">
                  <div className="w-full bg-base-100 flex h-24 rounded-xl p-4 gap-5">
                    <div className="avatar">
                      <div className="w-16 rounded-xl">
                        <img src={photoUrl} />
                      </div>
                    </div>

                    <div className="flex flex-col justify-center w-full">
                      <div className="font-bold">{fullName}</div>
                      {gender && age && (
                        <div className="text-sm opacity-60">{`${gender}, ${age}`}</div>
                      )}
                      <div className="text-sm opacity-70 line-clamp-1">
                        {about}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => handleRequestReject(connectionId)}
                      >
                        {`Reject`}
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-primary"
                        onClick={() => handleRequestAccept(connectionId)}
                      >
                        {`Accept`}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="p-5 flex justify-center">
            <h2>{`No request found.`}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
