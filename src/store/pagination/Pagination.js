import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data_length: 10,
  page_number: 1,
  total_data: 0,
  is_deleted: "No",
  prev: "",
  next: "",
  toggle: false,
  is_loaded: false,

  data_lengthb: 10,
  page_numberb: 1,
  total_datab: 0,
  is_deletedb: "No",
  prevb: "",
  nextb: "",
  toggleb: false,
  is_loadedb: false,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setDataLength: (state, action) => {
      state.data_length = action.payload;
    },
    setDataLengthB: (state, action) => {
      state.data_lengthb = action.payload;
    },
    setPageNumber: (state, action) => {
      state.page_number = action.payload;
    },
    setPageNumberB: (state, action) => {
      state.page_numberb = action.payload;
    },
    setTotalData: (state, action) => {
      state.total_data = action.payload;
    },
    setTotalDataB: (state, action) => {
      state.total_datab = action.payload;
    },
    setIsDeleted: (state, action) => {
      state.is_deleted = action.payload;
    },
    setIsDeletedB: (state, action) => {
      state.is_deletedb = action.payload;
    },
    setPrev: (state, action) => {
      state.prev = action.payload;
    },
    setPrevB: (state, action) => {
      state.prevb = action.payload;
    },
    setNext: (state, action) => {
      state.next = action.payload;
    },
    setNextB: (state, action) => {
      state.nextb = action.payload;
    },
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
    setToggleB: (state, action) => {
      state.toggleb = action.payload;
    },
    setDataLoaded: (state, action) => {
      state.is_loaded = action.payload;
    },
    setDataLoadedB: (state, action) => {
      state.is_loadedb = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDataLength,
  setDataLengthB,
  setPageNumber,
  setPageNumberB,
  setTotalData,
  setTotalDataB,
  setIsDeleted,
  setIsDeletedB,
  setPrev,
  setPrevB,
  setNext,
  setNextB,
  setDataLoaded,
  setDataLoadedB,
  setToggle,
  setToggleB,
} = paginationSlice.actions;

export default paginationSlice.reducer;
