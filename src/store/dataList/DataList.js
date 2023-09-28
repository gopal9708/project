import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list_toggle: false,
  index: "",
  index_value: "",
  ids: [],
  delete_id: false,
  select_all: false,
  select: false,
  close: false,
  nav_toggle: false,
  cm_filter: "",
};

export const dataListSlice = createSlice({
  name: "dataList",
  initialState,
  reducers: {
    setListToggle: (state, action) => {
      state.list_toggle = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setIndexValue: (state, action) => {
      state.index_value = action.payload;
    },
    setIds: (state, action) => {
      state.ids = action.payload;
    },
    setDeleteId: (state, action) => {
      state.delete_id = action.payload;
    },
    setSelectAll: (state, action) => {
      state.select_all = action.payload;
    },
    setSelect: (state, action) => {
      state.select = action.payload;
    },
    setClose: (state, action) => {
      state.close = action.payload;
    },
    setNavToggle: (state, action) => {
      state.nav_toggle = action.payload;
    },
    setCmFilter: (state, action) => {
      state.cm_filter = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setListToggle,
  setIndex,
  setIndexValue,
  setIds,
  setDeleteId,
  setSelectAll,
  setSelect,
  setClose,
  setNavToggle,
  setCmFilter,
} = dataListSlice.actions;

export default dataListSlice.reducer;
