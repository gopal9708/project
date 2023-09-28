import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search_item: "",
  is_search: false,
};

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setSearchItem: (state, action) => {
      state.search_item = action.payload;
    },
    setIsSearch: (state, action) => {
      state.is_search = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchItem, setIsSearch } = searchBarSlice.actions;

export default searchBarSlice.reducer;
