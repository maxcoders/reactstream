import { createSlice } from "@reduxjs/toolkit";
export const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: localStorage.getItem("user"),
  },
  reducers: {
    loginUser: (state, action) => {
      state.userInfo = action.payload;
    },
    logoutUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { loginUser, logoutUser } = userInfo.actions;
export default userInfo.reducer;
