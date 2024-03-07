import { postData } from "../../service/axiosservice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const postComment = createAsyncThunk("postComment", async (comment) => {
  const resp = await postData("/api/v1/comment", comment);
  console.log("comment", resp);
  return resp.data;
});

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
      toast.success("Commented sucessfully");
    });
    builder.addCase(postComment.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default commentSlice.reducer;
