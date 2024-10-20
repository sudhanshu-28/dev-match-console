import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { addFeed } from "../utils/feedSlice";
import { showErrorMessage } from "../utils/notifySlice";

import UserCard from "./UserCard";

import { BASE_URL, FEED_API } from "../api-config/endpoints";

const Feed = () => {
  const dispatch = useDispatch();

  const feedData = useSelector((store) => store?.feed);

  const fetchFeeds = async () => {
    try {
      const response = await axios.get(BASE_URL + FEED_API, {
        withCredentials: true,
      });

      const res = response?.data;

      if (res?.success) {
        if (res?.data && res?.data.length !== 0) {
          dispatch(addFeed(res?.data));
        }
      } else {
        dispatch(showErrorMessage(res?.message || "Error fetching Feed data."));
      }
    } catch (error) {
      console.error(error);
      dispatch(showErrorMessage(error || "Error fetching Feed data."));
    }
  };

  useEffect(() => {
    if (!feedData) {
      fetchFeeds();
    }
  }, [feedData]);

  return <div>{feedData && <UserCard user={feedData[0]} />}</div>;
};

export default Feed;
