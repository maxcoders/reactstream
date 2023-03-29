import { createSlice } from "@reduxjs/toolkit";
export const auth = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("auth"),
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
