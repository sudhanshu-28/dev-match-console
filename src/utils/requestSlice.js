import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isFetching: false,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    addConnectionRequests: (state, action) => {
      state.data = action.payload;
    },
    removeConnectionRequests: (state) => {
      state.data = null;
    },
    startFetchingConnectionRequests: (state) => {
      state.isFetching = true;
    },
    completeFetchingConnectionRequests: (state) => {
      state.isFetching = false;
    },
  },
});

export const {
  addConnectionRequests,
  removeConnectionRequests,
  startFetchingConnectionRequests,
  completeFetchingConnectionRequests,
} = requestSlice.actions;

export default requestSlice.reducer;
