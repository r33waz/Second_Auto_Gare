import { createSlice } from "@reduxjs/toolkit";
import { FetchVehicle, GetSingleVehicle } from "./vehiclethunk";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchVehicle.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(FetchVehicle.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
    });

    builder.addCase(FetchVehicle.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // for single vehicle
    builder.addCase(GetSingleVehicle.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(GetSingleVehicle.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
    });

    builder.addCase(GetSingleVehicle.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});
export default vehicleSlice.reducer;
