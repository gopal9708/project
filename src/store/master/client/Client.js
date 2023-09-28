import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  local_cal: {
    cal_type: "DONT",
    dimn: {
      cft: "",
      divided_by: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
    box_cal: {
      box_value: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
  },

  air_cal: {
    cal_type: "DONT",
    dimn: {
      cft: "",
      divided_by: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
    box_cal: {
      box_value: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
  },

  surface_cal: {
    cal_type: "DONT",
    dimn: {
      cft: "",
      divided_by: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
    box_cal: {
      box_value: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
  },

  cargo_cal: {
    cal_type: "DONT",
    dimn: {
      cft: "",
      divided_by: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
    box_cal: {
      box_value: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
  },

  train_cal: {
    cal_type: "DONT",
    dimn: {
      cft: "",
      divided_by: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
    box_cal: {
      box_value: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
  },

  courier_cal: {
    cal_type: "DONT",
    dimn: {
      cft: "",
      divided_by: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
    box_cal: {
      box_value: "",
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
    },
  },
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setLocalCal: (state, action) => {
      state.local_cal = action.payload;
    },
    setAirCal: (state, action) => {
      state.air_cal = action.payload;
    },
    setSurfaceCal: (state, action) => {
      state.surface_cal = action.payload;
    },
    setCargoCal: (state, action) => {
      state.cargo_cal = action.payload;
    },
    setTrainCal: (state, action) => {
      state.train_cal = action.payload;
    },
    setCourierCal: (state, action) => {
      state.courier_cal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLocalCal,
  setAirCal,
  setSurfaceCal,
  setCargoCal,
  setTrainCal,
  setCourierCal,
} = clientSlice.actions;

export default clientSlice.reducer;
