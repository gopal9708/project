import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filt_toggle: false,
  data_a: [],
  data_b: [],
  data_c: [],
  data_d: [],
  data_e: [],
  data_f: [],
  data_g: [],
  data_h: [],
  data_i: [],
  data_j: [],
};

export const filterValueSlice = createSlice({
  name: "filterValue",
  initialState,
  reducers: {
    setFilterToggle: (state, action) => {
      state.filt_toggle = action.payload;
    },
    setFilterA: (state, action) => {
      state.data_a = action.payload;
    },
    setFilterB: (state, action) => {
      state.data_b = action.payload;
    },
    setFilterC: (state, action) => {
      state.data_c = action.payload;
    },
    setFilterD: (state, action) => {
      state.data_d = action.payload;
    },
    setFilterE: (state, action) => {
      state.data_e = action.payload;
    },
    setFilterF: (state, action) => {
      state.data_f = action.payload;
    },
    setFilterG: (state, action) => {
      state.data_g = action.payload;
    },
    setFilterH: (state, action) => {
      state.data_h = action.payload;
    },
    setFilterI: (state, action) => {
      state.data_i = action.payload;
    },
    setFilterJ: (state, action) => {
      state.data_j = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFilterToggle,
  setFilterA,
  setFilterB,
  setFilterC,
  setFilterD,
  setFilterE,
  setFilterF,
  setFilterG,
  setFilterH,
  setFilterI,
  setFilterJ,
} = filterValueSlice.actions;

export default filterValueSlice.reducer;
