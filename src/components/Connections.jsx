import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { showErrorMessage } from "../utils/notifySlice";
import { addConnections } from "../utils/connectionSlice";

import { BASE_URL, CONNECTIONS_API } from "../api-config/endpoints";

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store?.connections);
  const [isFetching, setFetching] = useState(true);
  console.log(isFetching);

  const fetchConnections = async () => {
    await axios
      .get(BASE_URL + CONNECTIONS_API, { withCredentials: true })
      .then((res) => {
        const response = res?.data;
        const { success = false, data = null } = response;
        if (success && data) {
          dispatch(addConnections(data));
        }
      })
      .catch((err) => {
        const response = err?.response?.data;
        const { success, message } = response;
        if (!success) {
          const displayMsg =
            message || "Unable to fetch Connections. Please try again.";
          dispatch(showErrorMessage(displayMsg));
        }
      })
      .finally(() => {
        setFetching(false);
      });
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="w-full flex justify-center text-gray-700">
      <div className="w-1/2  rounded-xl bg-base-300 my-6">
        <div className="p-5">
          <h1 className="text-lg text-start items-center">{`My Connections`}</h1>
        </div>
        <div className="border-t border-gray-800"></div>

        {connections && connections.length !== 0 ? (
          <>
            {connections.map((record) => {
              const {
                _id: userId,
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
              } = record;

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
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="p-5 flex justify-center">
            <h2>{`No connections found.`}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
