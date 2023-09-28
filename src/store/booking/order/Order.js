import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cur_order_id: "",
  cur_order_docket_no: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCurOrderId: (state, action) => {
      state.cur_order_id = action.payload;
    },
    setCurOrderDocketNo: (state, action) => {
      state.cur_order_docket_no = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurOrderId, setCurOrderDocketNo } = orderSlice.actions;

export default orderSlice.reducer;
