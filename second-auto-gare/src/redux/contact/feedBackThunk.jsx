import { ErrorToast, SucessToast } from "../../components/common/toast";
import { main_uri } from "../../service";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const createFeedback = createAsyncThunk(
  "user/feedback",
  async (data) => {
    try {
        const resp = await main_uri.post(`/api/v1/feedback`, data);
        SucessToast({ message: resp?.data?.message });
        return resp?.data?.data;
    } catch (error) {
      ErrorToast({ message: "Something went wrong" });
    }
  }
);