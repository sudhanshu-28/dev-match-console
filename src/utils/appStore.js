import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notifyReducer from "./notifySlice";
import feedReducer from "./feedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    notify: notifyReducer,
    feed: feedReducer,
  },
});

export default appStore;
