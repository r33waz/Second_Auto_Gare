import { main_uri } from "../../service";
import { ErrorToast } from "../../components/common/toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMessagesByConvId = createAsyncThunk(
  "message/connvId",
  async ({ id }, { rejectWithValue }) => {
    try {
      const resp = await main_uri.get(
        `${import.meta.env.VITE_MAIN_URL}/api/v1/message/${id}`
      );
      return resp.data?.data;
    } catch (error) {
      ErrorToast({ message: "Something went wrong" });
      return rejectWithValue(error?.message);
    }
  }
);

export const createMessage = createAsyncThunk(
  "create/message",
    async ({ data }, { rejectWithValue }) => {
      console.log(data)
    try {
      const resp = await main_uri.post(
        `${import.meta.env.VITE_MAIN_URL}/api/v1/message`,
        data
      );
      return resp.data;
    } catch (error) {
        ErrorToast({ message: "Something went wrong" });
        return rejectWithValue(error?.message)
    }
  }
);
