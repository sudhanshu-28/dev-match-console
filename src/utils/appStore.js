import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notifyReducer from "./notifySlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    notify: notifyReducer,
  },
});

export default appStore;
