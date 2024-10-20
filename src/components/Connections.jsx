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

  return <>{isFetching ? <Skeleton /> : <div>Connections</div>}</>;
};

export default Connections;
