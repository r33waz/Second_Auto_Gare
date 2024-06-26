import toast from "react-hot-toast";
import { postData } from "../../service/axiosservice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SucessToast } from "../../components/common/toast";

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
    builder.addCase(postComment.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(postComment.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default commentSlice.reducer;
