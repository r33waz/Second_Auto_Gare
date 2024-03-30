import { deleteData, getData, postImageData, updateData } from "../../service/axiosservice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const CreateVehicle = createAsyncThunk("vehicle/create", async (data) => {
  const resp = await postImageData("/api/v1/add_vehicle",data)
  console.log(resp)
  return resp?.data
})

export const FetchVehicle = createAsyncThunk("vehicle/fetch", async () => {
  const resp = await getData("/api/v1/get_allvehicles");
  return resp.data;
});

export const GetSingleVehicle = createAsyncThunk(
  "vehicle/single",
  async (id) => {
    const resp = await getData(`/api/v1/get_vehicle/${id}`);
    return resp?.data;
  }
);

export const UpdateVehicle = createAsyncThunk(
  "vehicle/update",
  async ({ id, data }) => {

    const resp = await updateData(`/api/v1/update_vehicle/${id}`, data);
    return resp?.data;
  }
);

export const DeleteVehicle = createAsyncThunk("vehicle/delete", async (id) => {
  const resp = await deleteData(`/api/v1/delete_vehicle/${id}`);
  return resp?.data;
});
