import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show_alert: null,
  data_exist: "",
  alert_type: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setShowAlert: (state, action) => {
      state.show_alert = action.payload;
    },
    setDataExist: (state, action) => {
      state.data_exist = action.payload;
    },
    setAlertType: (state, action) => {
      state.alert_type = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShowAlert, setDataExist, setAlertType } = alertSlice.actions;

export default alertSlice.reducer;
