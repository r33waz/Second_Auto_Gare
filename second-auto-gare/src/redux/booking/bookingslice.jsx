import { createSlice } from "@reduxjs/toolkit";
import { CreateBooking, GetSingleUserBooking } from "./bookingthunk";
import { SucessToast } from "../../components/common/toast";

const initialState = {
  isLoading: false,
  data: [],
  error: null,
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
  },
});

export default bookingSlice.reducer;
