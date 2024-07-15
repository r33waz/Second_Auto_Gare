import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData, getData, updateData } from "../../service/axiosservice";
import axios from "axios";
import { ErrorToast, SucessToast } from "../../components/common/toast";
import { main_uri, photo_url} from "../../service";

export const GetAllUser = createAsyncThunk("GetAllUser", async () => {
  try {
    const resp = await main_uri.get(
      `/api/v1/users`
    );
    console.log("thunk all user", resp);
    return resp?.data?.data;
  } catch (error) {
    ErrorToast({ message: error.response.data?.message });
  }
});

export const GetSingleUser = createAsyncThunk(
  "GetSingleUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const resp = await main_uri.get(
        `/api/v1/users/${id}`
      );
      console.log("thunk single user", resp?.data);
      return resp?.data?.data;
    } catch (error) {
      console.log(error);
      ErrorToast({ message: error.response.data?.message });
      return rejectWithValue(error?.message);
    }
  }
);

export const Updateuser = createAsyncThunk(
  "Updateuser",
  async ({ id, data }, { rejectWithValue }) => {
    console.log("update",data)
    try {
      const resp = await photo_url.patch(
        `/api/v1/updateuser/${id}`,
        data
      );
      console.log("update resp", resp?.data);
      SucessToast({ message: resp?.data?.message });
      return resp?.data?.data;
    } catch (error) {
      if (error) {
        ErrorToast({ message: "Invalid file format" });
      } else {
        ErrorToast({ message: error.response.data?.message });
      }
      return rejectWithValue(error?.message);
    }
  }
);

export const DeleteUser = createAsyncThunk(
  "DeleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await main_uri.delete(
        `/api/v1/usersdelete/${id}`
      );
      SucessToast({ message: resp?.data.message });
      return resp?.data;
    } catch (error) {
      ErrorToast({ message: error.response.message });
      return rejectWithValue(error?.message);
    }
  }
);

export const SearchUser = createAsyncThunk(
  "SearchUser",
  async (data, { rejectWithValue }) => {
    try {
      const resp = await main_uri.get(`/api/v1/user/?email=${data}`);
      return resp?.data?.data;
    } catch (error) {
      ErrorToast({ message: error.response.data?.message });
      return rejectWithValue(error?.message);
    }
  }
);
