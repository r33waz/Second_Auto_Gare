import { createSlice } from "@reduxjs/toolkit";
import { GetSingleUserBooking } from "./bookingthunk";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetSingleUserBooking.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetSingleUserBooking.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(GetSingleUserBooking.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default bookingSlice.reducer;
