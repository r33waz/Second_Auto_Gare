import { createAsyncThunk } from "@reduxjs/toolkit";
import { main_uri } from "../../service";
import { ErrorToast } from "../../components/common/toast";

export const userCategoryChart = createAsyncThunk(
  "user/category/chart",
  async () => {
    try {
      const resp = await main_uri.get(
        `/api/v1/user_category`
      );
      return resp?.data?.data;
    } catch (error) {
      ErrorToast({ message: "Something went wrong" });
    }
  }
);

export const vehicleCategoryChart = createAsyncThunk(
  "vehicle/category/chart",
  async () => {
    try {
      const resp = await main_uri.get(
        `/api/v1/vehicle_category`
      );
      return resp?.data?.data;
    } catch (error) {
      ErrorToast({ message: "Something went wrong" });
    }
  }
);

export const vehicleStatusChart = createAsyncThunk(
  "vehicle/status/chart",
  async () => {
    try {
      const resp = await main_uri.get(
        `/api/v1/vehicle_status`
      );
      return resp?.data?.data;
    } catch (error) {
      ErrorToast({ message: "Something went wrong" });
    }
  }
);
