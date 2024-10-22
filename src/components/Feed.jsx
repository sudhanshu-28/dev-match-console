import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { addFeed } from "../utils/feedSlice";
import { showErrorMessage } from "../utils/notifySlice";

import UserCard from "./UserCard";

import { BASE_URL, FEED_API } from "../api-config/endpoints";

const EmptyFeed = ({ fetchFeeds }) => (
  <div className="card bg-base-100 w-96 shadow-xl">
    <figure className="w-96 h-72 overflow-hidden flex flex-col p-12 text-center gap-6">
      <h1 className="text-lg">
        Taking a break to find more great matches for you!
      </h1>
      <h1 className="text-lg">Come back soon for more.</h1>
      <button
        className="btn btn-primary"
        onClick={fetchFeeds}
      >{`Find More Connections`}</button>
    </figure>
  </div>
);

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
    if (!feedData || feedData.length === 0) {
      fetchFeeds();
    }
  }, [feedData]);

  return (
    <div className="flex justify-center items-center w-full my-6">
      {!feedData || feedData?.length === 0 ? (
        <EmptyFeed fetchFeeds={fetchFeeds} />
      ) : (
        feedData?.[0] && <UserCard user={feedData[0]} />
      )}
    </div>
  );
};

export default Feed;
