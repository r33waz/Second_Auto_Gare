import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { DeleteUser, GetAllUser, GetSingleUser, Updateuser } from "./userthunk";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  singleUser: null,
  singleUserError: null,
  singleUserLoading: false,
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
      state.singleUserLoading = true;
    });
    builder.addCase(GetSingleUser.fulfilled, (state, action) => {
      (state.singleUserLoading = false), (state.singleUser = action.payload);
    });
    builder.addCase(GetSingleUser.rejected, (state, action) => {
      (state.singleUserLoading = false),
        (state.singleUserError = action.error.message);
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
    });

    // to delete user
    builder.addCase(DeleteUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(DeleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      toast.success("User deleted successfully");
    });

    builder.addCase(DeleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
