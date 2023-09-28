import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  docket_number: [],
  search_docket: false,
};

export const orderTrackingSlice = createSlice({
  name: "Tracking",
  initialState,
  reducers: {
    setDocketNumber: (state, action) => {
      state.docket_number = action.payload;
    },
    setSearchDocket: (state, action) => {
      state.search_docket = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDocketNumber, setSearchDocket } = orderTrackingSlice.actions;

export default orderTrackingSlice.reducer;
