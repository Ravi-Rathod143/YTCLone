import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logoutUser: (state) => {
      state.userInfo = null;
      state.userDetails = null;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserInfo, logoutUser, setUserDetails } = authSlice.actions;
export default authSlice.reducer;