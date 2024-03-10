import { getData } from "../../service/axiosservice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const FetchVehicle = createAsyncThunk("vehicle/fetch", async () => {
  const resp = await getData("/api/v1/get_allvehicles");
  return resp.data;
});

export const GetSingleVehicle = createAsyncThunk(
  "vehicle/single",
  async (id) => {
    console.log("vehicle id", id);
    const resp = await getData(`/api/v1/get_vehicle/${id}`);
    console.log("single vehicle", resp);
    return resp?.data;
  }
);
