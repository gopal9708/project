import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: "",
  manifest_tab: 1,
  runsheet_tab: 1,
  ewaybill_tab: 1,
  incoming_tab: 1,
  rough_tab: 1,
  depart_tab: 1,
  hub_tab: 1,
  location_tab: 1,
  bindetails_tab: 1,
  outbound_tab: 1,
  inventory_tab:1,
  inbound_tab:1,
  trip_tab:1,
};

export const parentFilterSlice = createSlice({
  name: "parentFilter",
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
    setManifestTab: (state, action) => {
      state.manifest_tab = action.payload;
    },
    setRunsheetTab: (state, action) => {
      state.runsheet_tab = action.payload;
    },
    setEwayBilltTab: (state, action) => {
      state.ewaybill_tab = action.payload;
    },
    setIncomingTab: (state, action) => {
      state.incoming_tab = action.payload;
    },
    setRoughTab: (state, action) => {
      state.rough_tab = action.payload;
    },
    setDepartTab: (state, action) => {
      state.depart_tab = action.payload;
    },
    setHubTab: (state, action) => {
      state.hub_tab = action.payload;
    },
    setLocationTab: (state, action) => {
      state.location_tab = action.payload;
    },
    setBinDetailsTab: (state, action) => {
      state.bindetails_tab = action.payload;
    },
    setOutBoundTab: (state, action) => {
      state.bindetails_tab = action.payload;
    },
    setInventoryTab: (state, action) => {
      state.inventory_tab = action.payload;
    },
    setInBoundTab: (state, action) => {
      state.inbound_tab = action.payload;
    },
    setTripTab: (state, action) => {
      state.trip_tab = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setToggle,
  setManifestTab,
  setRunsheetTab,
  setIncomingTab,
  setRoughTab,
  setHubTab,
  setEwayBilltTab,
  setDepartTab,
  setLocationTab,
  setBinDetailsTab,
  setOutBoundTab,
  setInventoryTab,
  setInBoundTab,
  setTripTab
} = parentFilterSlice.actions;

export default parentFilterSlice.reducer;
