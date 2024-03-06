import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, updateData } from "../../service/axiosservice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const getSingleUser = createAsyncThunk(
  "getSingleUser",
  async ({ id }) => {
    const resp = await getData(`/api/v1/users/${id}`);
    console.log("thunk single user", resp);
    return resp.data;
  }
);

export const UpdateUser = createAsyncThunk(
  "Updateuser",
  async ({ id, data }) => {
    const resp = await updateData(`/api/v1/updateuser/${id}`, data);
    return resp.data;
  }
);

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleUser.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
    });
    builder.addCase(getSingleUser.rejected, (state, action) => {
      (state.isLoading = false), (state.error = action.error.message);
    });
    // For update user

    builder.addCase(UpdateUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(UpdateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
       toast.success("User updated successfully");
    });

    builder.addCase(UpdateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error("Error updating user");
    });
  },
});

export default userSlice.reducer;