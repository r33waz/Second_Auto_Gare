import { createSlice } from "@reduxjs/toolkit";
import { SendOtp } from "./otpthunk";
import { SucessToast } from "../../components/common/toast";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SendOtp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(SendOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      SucessToast({ message: "Check email for the OTP!" });
    });
    builder.addCase(SendOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
     
    });
  },
});

export default otpSlice.reducer;
