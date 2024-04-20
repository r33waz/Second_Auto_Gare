import { ErrorToast, SucessToast } from "../../components/common/toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { main_uri } from "../../service";

export const GetAllBooking = createAsyncThunk("getAll/booking", async () => {
  try {
    const resp = await main_uri.get(`/api/v1/all_bookings`);
    return resp?.data?.data;
  } catch (error) {
    ErrorToast({ message: error.response.data?.message });
  }
});

export const GetSingleUserBooking = createAsyncThunk(
  "user/booking",
  async ({id}, { rejectWithValue }) => {
    try {
      const resp = await main_uri.get(`/api/v1/bookings/${id}`);
      return resp?.data?.data;
    } catch (error) {
      ErrorToast({ message: error.response.data?.message });
      return rejectWithValue(error.message);
    }
  }
);

export const CreateBooking = createAsyncThunk(
  "booking",
  async ({ data }, { rejectWithValue }) => {
    try {
      const resp = await main_uri.post(`/api/v1/booking`, data, main_uri);
      SucessToast({ message: resp?.message });
      return resp?.data;
    } catch (error) {
      ErrorToast({ message: error.response.data?.message });
      return rejectWithValue(error.message);
    }
  }
);

export const DeleteBooking = createAsyncThunk(
  "delete/booking",
  async ({ id }, { rejectWithValue }) => {
    try {
      const resp = await main_uri.delete(`/api/v1/delete_booking/${id}`);
      return resp?.data;
    } catch (error) {
      ErrorToast({ message: error.response.data?.message });
      return rejectWithValue(error.message);
    }
  }
);

export const GetSingleBookingInfo = createAsyncThunk(
  "single/booking/info",
  async (id , { rejectWithValue }) => {
    try {
      const resp = await main_uri.get(`/api/v1/single_booking/${id}`);
      return resp?.data?.data;
    } catch (error) {
      ErrorToast({ message: error.response.data?.message });
      return rejectWithValue(error.message);
    }
  }
);
