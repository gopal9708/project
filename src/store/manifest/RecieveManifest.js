import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order_id: [],
  issueorder_id: [],
  futher_conn_id: [],
  going_hub_id: [],
  loaded: false,
};

export const manifestSlice = createSlice({
  name: "recievemanifest",
  initialState,
  reducers: {
    setOrder_id: (state, action) => {
      state.order_id = action.payload;
    },
    setIssue_id: (state, action) => {
      state.issueorder_id = action.payload;
    },
    setFuther_conn_id: (state, action) => {
      state.futher_conn_id = action.payload;
    },
    setGoing_hub_id: (state, action) => {
      state.going_hub_id = action.payload;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setOrder_id,
  setLoaded,
  setFuther_conn_id,
  setGoing_hub_id,
  setIssue_id,
} = manifestSlice.actions;

export default manifestSlice.reducer;
