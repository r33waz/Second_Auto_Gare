import axios from "axios";
import { ErrorToast, SucessToast } from "../../components/common/toast";
import {
  deleteData,
  getData,
  postData,
  updateData,
} from "../../service/axiosservice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { main_uri } from "../../service";

export const GetAllBooking = createAsyncThunk(
  "getAll/booking",
  async ({ rejectWithValue }) => {
    try {
      const resp = await axios.get("/api/v1/all_bookings");
      return resp?.data;
    } catch (error) {
      ErrorToast({ message: error.response.data?.message });
      return rejectWithValue(error.message);
    }
  }
);

export const GetSingleUserBooking = createAsyncThunk(
  "user/booking",
  async ({ id }, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}/api/v1/bookings/${id}`
      );
      SucessToast({ message: resp?.message });
      return resp?.data;
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
      const resp = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}/api/v1/booking`,
        data,
        main_uri
      );
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
      const resp = await axios.delete(`/api/v1/delete_booking/${id}`);
      return resp?.data;
    } catch (error) {
      ErrorToast({ message: error.response.data?.message });
      return rejectWithValue(error.message);
    }
  }
);

// export const UpdateBooking = createAsyncThunk("update/booking", async () => {
//   const resp = await updateData();
//   return resp?.data;
// });
