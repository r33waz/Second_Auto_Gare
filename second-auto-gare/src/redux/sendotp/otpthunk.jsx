import { postData } from "../../service/axiosservice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const SendOtp = createAsyncThunk("send/otp", async ({ data }) => {
  const resp = await postData("/api/v1/send_otp", data);
  console.log(resp);
  return resp?.data;
});

export const VerifyOtp = createAsyncThunk("verify/otp", async ({ data }) => {
  const resp = await postData("/api/v1/verify_otp", data);
  return resp?.data;
});
