import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  local_cal_cust: {
    cal_type: "DONT",
    dimn: {
      cft: "",
      div_by: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
    box_cal: {
      box_val: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
  },
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setLocalCalCust: (state, action) => {
      state.local_cal_cust = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocalCalCust } = customerSlice.actions;

export default customerSlice.reducer;
