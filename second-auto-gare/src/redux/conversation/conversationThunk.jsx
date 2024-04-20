import { main_uri } from "../../service";
import { ErrorToast } from "../../components/common/toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const singleUserConvo = createAsyncThunk(
  "single/user/convoo",
  async ({ id }, { rejectWithValue }) => {
    try {
      const resp = await main_uri.get(
        `/api/v1/single_user_conversation/${id}`
      );
      return resp?.data?.data;
    } catch (error) {
      ErrorToast({ message: "Something went wrong" });
      return rejectWithValue(error?.message);
    }
  }
);