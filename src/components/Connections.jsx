import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { showErrorMessage } from "../utils/notifySlice";
import { addConnections } from "../utils/connectionSlice";

import Skeleton from "./Skeleton";

import { BASE_URL, CONNECTIONS_API } from "../api-config/endpoints";

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store?.connections);
  const [isFetching, setFetching] = useState(true);

  console.log(connections);
  console.log(isFetching);

  const fetchConnections = async () => {
    await axios(BASE_URL + CONNECTIONS_API, { withCredentials: true })
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
    <div className="w-full flex justify-center items-start my-6">
      {isFetching ? (
        <Skeleton />
      ) : (
        <div className="flex justify-start text-start">
          <h1 className="text-bold text-2xl">
            {!connections || connections.length === 0
              ? `No connections found.`
              : `My Connections`}
          </h1>

          <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16">
            <div className="bg-gray-100 py-2 px-4">
              <h2 className="text-xl font-semibold text-gray-800">{`My Connections`}</h2>
            </div>
            <ul className="divide-y divide-gray-200">
              <li className="flex items-center py-4 px-6">
                <span className="text-gray-700 text-lg font-medium mr-4">
                  1.
                </span>
                <img
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  src="https://randomuser.me/api/portraits/women/72.jpg"
                  alt="User avatar"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">
                    Emily Jones
                  </h3>
                  <p className="text-gray-600 text-base">1234 points</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connections;
