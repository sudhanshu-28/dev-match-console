import { createSlice } from "@reduxjs/toolkit";

const notifySlice = createSlice({
  name: "notify",
  initialState: null,
  reducers: {
    showSuccessMessage: (state, action) => {
      const { payload } = action;

      return {
        type: "success",
        message: payload?.message,
      };
    },
    showErrorMessage: (state, action) => {
      const { payload } = action;

      return {
        type: "error",
        message: payload?.message,
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
