import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import userInfoReducer from "./userReducer";
//import rtcSlice from "./rtcSlice";

const rootReducer = combineReducers({
  //rtc:rtcSlice,
  auth: authReducer,
  userInfo: userInfoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
