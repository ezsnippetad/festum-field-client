import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../component/auth/authSlice";
import profileSlice from "./Slice/profileSlice";
import productSlice from "./Slice/productSlice";
import notificationSlice from "./Slice/notificationSlice";
import requestSlice from "./Slice/requestSlice";
import chatSlice from "./Slice/chatSlice";
import videoCallSlice from "./Slice/videoCallSlice";
import socketSlice from "./Slice/socketSlice";
import callSlice from "./Slice/callSlice";
//import meetingSlice from "./Slice/meetingSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import sidebarslices from "./Slice/sidebarslices";


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  //serialize: data => JSON.stringify(data), // Custom serialization logic
  //deserialize: data => JSON.parse(data), // Custom deserialization logic
}


const combineReducer = combineReducers({
  socketStore: socketSlice,
  auth: authSlice,
  profile: profileSlice,
  product: productSlice,
  notification: notificationSlice,
  request: requestSlice,
  chat: chatSlice,
  videoCall: videoCallSlice,
  call: callSlice,
  //meeting: meetingSlice,
  sideBars:sidebarslices
});

const persistedReducer = persistReducer(persistConfig, combineReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;
