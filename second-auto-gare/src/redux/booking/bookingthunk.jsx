import { deleteData, getData, updateData } from "../../service/axiosservice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAllBooking = createAsyncThunk("getAll/booking", async () => {
  const resp = await getData();
  return resp?.data;
});

export const GetSingleUserBooking = createAsyncThunk(
  "user/booking",
  async ({ id }) => {
    const resp = await getData(`/api/v1/bookings/${id}`);
    return resp?.data;
  }
);

export const DeleteBooking = createAsyncThunk("delete/booking", async () => {
  const resp = await deleteData();
  return resp?.data;
});

export const UpdateBooking = createAsyncThunk("update/booking", async () => {
  const resp = await updateData();
  return resp?.data;
});
