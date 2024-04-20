import { createSlice } from "@reduxjs/toolkit";
import { CreateBooking, GetAllBooking, GetSingleBookingInfo, GetSingleUserBooking } from "./bookingthunk";

const initialState = {
  isLoading: false,
  data: [],
  error: null,
  singleBooking:null
};

const bookingSlice = createSlice({
  name: "booking",
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

     builder.addCase(CreateBooking.pending, (state) => {
       state.isLoading = true;
     });
     builder.addCase(CreateBooking.fulfilled, (state, action) => {
       state.isLoading = false;
       state.data = action.payload;
     });
     builder.addCase(CreateBooking.rejected, (state, action) => {
       state.isLoading = false;
       state.error = action.error.message;
     });
    
     builder.addCase(GetAllBooking.pending, (state) => {
       state.isLoading = true;
     });
     builder.addCase(GetAllBooking.fulfilled, (state, action) => {
       state.isLoading = false;
       state.data = action.payload;
     });
     builder.addCase(GetAllBooking.rejected, (state, action) => {
       state.isLoading = false;
       state.error = action.error.message;
     });
    
     builder.addCase(GetSingleBookingInfo.pending, (state) => {
       state.isLoading = true;
     });
     builder.addCase(GetSingleBookingInfo.fulfilled, (state, action) => {
       state.isLoading = false;
       state.singleBooking = action.payload;
     });
     builder.addCase(GetSingleBookingInfo.rejected, (state, action) => {
       state.isLoading = false;
       state.error = action.error.message;
     });
  },
});

export default bookingSlice.reducer;
