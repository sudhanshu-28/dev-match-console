import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isFetching: false,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeed: (state, action) => {
      state.data = action?.payload;
    },
    removeFeed: (state, action) => {
      const { data } = state;
      const newFeed = data.filter((user) => user?._id !== action.payload);
      state.data = newFeed;
    },
    handleFeedLoading: (state, action) => {
      state.isFetching = action?.payload;
    },
  },
});

export const { addFeed, removeFeed, handleFeedLoading } = feedSlice.actions;

export default feedSlice.reducer;
