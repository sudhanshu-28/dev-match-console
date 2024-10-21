import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notifyReducer from "./notifySlice";
import feedReducer from "./feedSlice";
import requestReducer from "./requestSlice";
import connectionReducer from "./connectionSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    notify: notifyReducer,
    feed: feedReducer,
    request: requestReducer,
    connections: connectionReducer,
  },
});

export default appStore;
