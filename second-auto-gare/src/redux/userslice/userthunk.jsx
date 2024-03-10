import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteData,
  getData,
  updateData,
} from "../../service/axiosservice";
export const GetAllUser = createAsyncThunk("GetAllUser", async () => {
  const resp = await getData("/api/v1/users");
  console.log("thunk all user", resp);
  return resp.data;
});

export const GetSingleUser = createAsyncThunk(
  "GetSingleUser",
  async ({ id }) => {
    const resp = await getData(`/api/v1/users/${id}`);
    console.log("thunk single user", resp);
    return resp.data;
  }
);

export const Updateuser = createAsyncThunk(
  "Updateuser",
  async ({ id, data }) => {
    console.log("userid", id);
    console.log("userdata", data);
    const resp = await updateData(`/api/v1/updateuser/${id}`, data);
    return resp.data;
  }
);

export const DeleteUser = createAsyncThunk("DeleteUser", async (id) => {
  const resp = await deleteData(`/api/v1/usersdelete/${id}`);
  return resp?.data;
});

export const SearchUser = createAsyncThunk("SearchUser", async (data) => {
  const resp = await getData(`/api/v1/user/?email=${data}`);
  return resp.data;
});
