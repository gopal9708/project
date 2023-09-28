import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navigation_list: [],
  cust_user_permissions: [],
  setpermission: false,
};

export const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setNavigationList: (state, action) => {
      state.navigation_list = action.payload;
    },
    setCustUserPermissions: (state, action) => {
      state.cust_user_permissions = action.payload;
    },
    setPermission: (state, action) => {
      state.setpermission = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNavigationList, setCustUserPermissions, setPermission } =
  permissionsSlice.actions;

export default permissionsSlice.reducer;
