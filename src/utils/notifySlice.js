import { createSlice } from "@reduxjs/toolkit";

const notifySlice = createSlice({
  name: "notify",
  initialState: null,
  reducers: {
    showSuccessMessage: (state, action) => {
      const { payload } = action;

      return {
        type: "success",
        message: payload,
      };
    },
    showErrorMessage: (state, action) => {
      const { payload } = action;

      return {
        type: "error",
        message: payload,
      };
    },
    clearMessage: () => {
      return null;
    },
  },
});

export const { showSuccessMessage, showErrorMessage, clearMessage } =
  notifySlice.actions;

export default notifySlice.reducer;
