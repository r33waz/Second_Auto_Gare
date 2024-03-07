import { getData } from "../../service/axiosservice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVehicle = createAsyncThunk("fetchVehicle", async () => {
  const resp = await getData("/api/v1/get_allvehicles");
  return resp.data;
});

export const getSingleVehicle = createAsyncThunk(
  "getSingleVehicle",
  async ({ id }) => {
    const resp = await getData(`/api/v1/get_vehicle/${id}`);
    console.log("single vehicle", resp);
    return resp?.data;
  }
);

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
    builder.addCase(fetchVehicle.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchVehicle.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
    });

    builder.addCase(fetchVehicle.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // for single vehicle
    builder.addCase(getSingleVehicle.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSingleVehicle.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
    });

    builder.addCase(getSingleVehicle.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});
export default vehicleSlice.reducer;
