import { createSlice } from "@reduxjs/toolkit";
import {
  CreateVehicle,
  DeleteVehicle,
  FetchVehicle,
  GetSingleVehicle,
  UpdateVehicle,
} from "./vehiclethunk";
import toast from "react-hot-toast";
import { SucessToast } from "../../components/common/toast";

const initialState = {
  isLoading: false,
  data: [],
  error: null,
  singleVehicle: null,
  singleVehicleErrror: null,
  singleVehicleLoading: false,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //to create a vehicle post
    builder.addCase(CreateVehicle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CreateVehicle.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
    });
    builder.addCase(CreateVehicle.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    //to get all the vehicle
    builder.addCase(FetchVehicle.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(FetchVehicle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(FetchVehicle.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // for single vehicle
    builder.addCase(GetSingleVehicle.pending, (state) => {
      state.singleVehicleLoading = true;
    });

    builder.addCase(GetSingleVehicle.fulfilled, (state, action) => {
      state.singleVehicleLoading = false;
      state.singleVehicle = action.payload;
    });

    builder.addCase(GetSingleVehicle.rejected, (state, action) => {
      state.singleVehicleErrror = action.error.message;
    });
    // to update the vehicle
    builder.addCase(UpdateVehicle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UpdateVehicle.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
      SucessToast({ message: "Vehicle updated sucessfully" });
    });
    builder.addCase(UpdateVehicle.rejected, (state, action) => {
      (state.isLoading = false), (state.error = action.error.message);
    });
    // delete the delete the vehicle
    builder.addCase(DeleteVehicle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteVehicle.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
      toast.success("Deleted Successfully");
    });
    builder.addCase(DeleteVehicle.rejected, (state, action) => {
      (state.isLoading = false), (state.error = action.error.message);
    });
  },
});
export default vehicleSlice.reducer;
