import { createAsyncThunk } from "@reduxjs/toolkit";
import { main_uri } from "../../service";
import { ErrorToast, SucessToast } from "../../components/common/toast";

export const userLogin = createAsyncThunk(
  "user/login",
  async (data , { rejectWithValue }) => {
    try {
      const resp = await main_uri.post(
        `${import.meta.env.VITE_MAIN_URL}/api/v1/login`,
        data
      );
      SucessToast({ message: resp?.data?.message });
      return resp.data?.data;
    } catch (error) {
      ErrorToast({ message: error.response?.data?.message });
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const userLogut = createAsyncThunk("user/logout", async () => {
  try {
    const resp = await main_uri.post(
      `${import.meta.env.VITE_MAIN_URL}/api/v1/logout`
    );
    return resp.data;
  } catch (error) {
    ErrorToast({ message: error.response?.data?.message });
  }
});
