import { createAsyncThunk } from "@reduxjs/toolkit";
import { main_uri } from "../../service";
import { ErrorToast, SucessToast } from "../../components/common/toast";

export const userLogin = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const resp = await main_uri.post(`/api/v1/login`, data);
      SucessToast({ message: resp?.data?.message });
      return resp.data?.data;
    } catch (error) {
      ErrorToast({ message: error.response?.data?.message });
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const userSignup = createAsyncThunk(
  "user/signup",
  async (data, { rejectWithValue }) => {
    try {
      const resp = await main_uri.post(`/api/v1/signup`, data);
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
    const resp = await main_uri.post(`/api/v1/logout`);
    SucessToast({ message: resp?.data?.message });
    return resp.data;
  } catch (error) {
    ErrorToast({ message: error.response?.data?.message });
  }
});

export const forgetPassword = createAsyncThunk(
  "user/forget/password",
  async (data, { rejectWithValue }) => {
    try {
      const resp = await main_uri.post(`/api/v1/forget_password`, data);
      SucessToast({ message: resp?.data?.message });
    } catch (error) {
      ErrorToast({ message: error.response?.data?.message });
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const resetToken = createAsyncThunk(
  "user/rest/token",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const resp = await main_uri.get(`/api/v1/reset_password/${id}/${token}`);
      console.log(resp);
      SucessToast({ message: resp?.data?.message });
      return resp?.data;
    } catch (error) {
      ErrorToast({ message: error.response?.data?.message });
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const setPassword = createAsyncThunk(
  "user/set/password",
  async ({ id, token, data }, { rejectWithValue }) => {
    console.log(id, token, data);
    try {
      const resp = await main_uri.post(
        `/api/v1/set_password/${id}/${token}`,
        {password:data?.confirmnewpassword}
      );
      SucessToast({ message: resp?.data?.message });
    } catch (error) {
      ErrorToast({ message: error.response?.data?.message });

      return rejectWithValue(error.response?.data?.message);
    }
  }
);
