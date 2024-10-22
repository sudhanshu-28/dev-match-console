import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isFetching: false,
};

const connectionSlice = createSlice({
  name: "connection",
  initialState: initialState,
  reducers: {
    addConnections: (state, action) => {
      state.data = action.payload;
    },
    removeConnections: (state) => {
      state.data = null;
    },
    startFetchingConnections: (state) => {
      state.isFetching = true;
    },
    completeFetchingConnections: (state) => {
      state.isFetching = false;
    },
  },
});

export const {
  addConnections,
  removeConnections,
  startFetchingConnections,
  completeFetchingConnections,
} = connectionSlice.actions;

export default connectionSlice.reducer;
