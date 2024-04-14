import { createSlice } from "@reduxjs/toolkit";
import {
  userCategoryChart,
  vehicleCategoryChart,
  vehicleStatusChart,
} from "./chartThunk";

const initialState = {
  laoding: false,
  usersData: [],
  vehicleData: [],
  vehicleStatusData: [],
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userCategoryChart.pending, (state) => {
      state.laoding = true;
    });
    builder.addCase(userCategoryChart.fulfilled, (state, action) => {
      (state.laoding = false), (state.usersData = action.payload);
    });
    builder.addCase(userCategoryChart.rejected, (state) => {
      state.laoding = false;
    });

    builder.addCase(vehicleCategoryChart.pending, (state) => {
      state.laoding = true;
    });
    builder.addCase(vehicleCategoryChart.fulfilled, (state, action) => {
      (state.laoding = false), (state.vehicleData = action.payload);
    });
    builder.addCase(vehicleCategoryChart.rejected, (state) => {
      state.laoding = false;
    });

    builder.addCase(vehicleStatusChart.pending, (state) => {
      state.laoding = true;
    });
    builder.addCase(vehicleStatusChart.fulfilled, (state, action) => {
      (state.laoding = false), (state.vehicleStatusData = action.payload);
    });
    builder.addCase(vehicleStatusChart.rejected, (state) => {
      state.laoding = false;
    });
  },
});

export default chartSlice.reducer;
