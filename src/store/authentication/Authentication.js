import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  userpass: { username: "", password: "" },
  userdetails: {},
  access_token: "",
  refresh_token: "",
  login_id: "",
  userdepartment: {},
  userpermission: [],
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserPass: (state, action) => {
      state.userpass = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userdetails = action.payload;
    },
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refresh_token = action.payload;
    },
    setLoginID: (state, action) => {
      state.login_id = action.payload;
    },
    setUserDepartment: (state, action) => {
      state.userdepartment = action.payload;
    },
    setUserPermission: (state, action) => {
      state.userpermission = action.payload;
    },
    resetAuthenticationState: (state,action) => {
      state.username = "";
      state.userpass = { username: "", password: "" };
      state.userdetails = {};
      state.access_token = "";
      state.refresh_token = "";
      state.login_id = "";
      state.userdepartment = {};
      state.userpermission = [];
localStorage.removeItem('userdetails')

    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setUsername,
  setUserPass,
  setUserDetails,
  setAccessToken,
  setRefreshToken,
  setLoginID,
  setUserDepartment,
  setUserPermission,
  resetAuthenticationState,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
