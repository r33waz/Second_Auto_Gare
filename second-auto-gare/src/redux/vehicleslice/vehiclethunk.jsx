import { main_uri, photo_url } from "../../service";
import {
  deleteData,
  getData,
  postImageData,
  updateData,
} from "../../service/axiosservice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorToast, SucessToast } from "../../components/common/toast";

export const CreateVehicle = createAsyncThunk(
  "vehicle/create",
  async (data, { rejectWithValue }) => {
    try {
      const resp = await photo_url.post("/api/v1/add_vehicle", data);
      console.log(resp);
      return resp?.data?.data;
    } catch (error) {
      ErrorToast({ message: error.response.data?.message });
      rejectWithValue(error?.message);
    }
  }
);

export const FetchVehicle = createAsyncThunk("vehicle/fetch", async () => {
  try {
    const resp = await main_uri.get("/api/v1/get_allvehicles");
    return resp?.data?.data;
  } catch (error) {
    ErrorToast({ message: error.response.data?.message });
  }
});

export const GetSingleVehicle = createAsyncThunk(
  "vehicle/single",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await getData(`/api/v1/get_vehicle/${id}`);
      return resp?.data;
    } catch (error) {
      ErrorToast({ message: error.response.data?.message });
      return rejectWithValue(error?.message);
    }
  }
);

export const UpdateVehicle = createAsyncThunk(
  "vehicle/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const resp = await updateData(`/api/v1/update_vehicle/${id}`, data);
      SucessToast({ message: resp?.message });
      return resp?.data?.data;
    } catch (error) {
      ErrorToast({ message: error.response.data?.message });
      return rejectWithValue(error?.message);
    }
  }
);

export const DeleteVehicle = createAsyncThunk(
  "vehicle/delete",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await deleteData(`/api/v1/delete_vehicle/${id}`);
      SucessToast({ message: resp?.message });
      return resp?.data?.data;
    } catch (error) {
      ErrorToast({ message: error.response.data?.message });
      return rejectWithValue(error?.message);
    }
  }
);
