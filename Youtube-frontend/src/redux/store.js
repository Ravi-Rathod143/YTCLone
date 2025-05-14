import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import channelReducer from "./channelSlice";
import videoReducer from "./videoSlice";
import commentReducer from "./commentSlice";
import historyReducer from "./historySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    channel: channelReducer,
    video: videoReducer,
    comment: commentReducer,
    history: historyReducer, // historyReducer is added to the store
  },
});
