import { main_uri, photo_url } from "../../service";
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
      const resp = await main_uri.get(`/api/v1/get_vehicle/${id}`);
      return resp?.data?.data;
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
      const resp = await photo_url.patch(`/api/v1/update_vehicle/${id}`, data);
      SucessToast({ message: resp?.data?.message });
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
      const resp = await main_uri.delete(`/api/v1/delete_vehicle/${id}`);
      SucessToast({ message: resp?.message });
      return resp?.data?.data;
    } catch (error) {
      ErrorToast({ message: error.response.data?.message });
      return rejectWithValue(error?.message);
    }
  }
);

export const SearchVehicle = createAsyncThunk(
  "vehicle/search",
  async (
    { brand, category, transmission, fule_type, color, year },
    { rejectWithValue }
  ) => {
    console.log(brand, category, transmission, fule_type, color, year);
    try {
      const resp = await main_uri.get(
        `/api/v1/vehicles/search?transmission=${transmission}&category=${category}&brand=${brand}&fule_type=${fule_type}&color=${color}&year=${year}&displacement=&min=&max=`
      );
      return resp?.data?.data;
    } catch (error) {
      console.log(error);
      // ErrorToast({ message: error.response });
      return rejectWithValue(error?.message);
    }
  }
);
