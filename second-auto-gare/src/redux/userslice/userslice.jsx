import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, updateData } from "../../service/axiosservice";
import { toast } from "react-toastify";
import { GetAllUser, GetSingleUser, Updateuser } from "./userthunk";


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
    // for all user
    builder.addCase(GetAllUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(GetAllUser.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
    });

    builder.addCase(GetAllUser.rejected, (state, action) => {
      (state.isLoading = false), (state.error = action.error?.message);
    });
    // for single user
    builder.addCase(GetSingleUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetSingleUser.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
    });
    builder.addCase(GetSingleUser.rejected, (state, action) => {
      (state.isLoading = false), (state.error = action.error.message);
    });
    // For update user
    builder.addCase(Updateuser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(Updateuser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      toast.success("User updated successfully");
    });

    builder.addCase(Updateuser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error("Error updating user");
    });
  },
});

export default userSlice.reducer;
