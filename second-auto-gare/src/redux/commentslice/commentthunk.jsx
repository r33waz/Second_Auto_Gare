import { postData } from "../../service/axiosservice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const postComment = createAsyncThunk("postComment", async (comment) => {
  const resp = await postData("/api/v1/comment", comment);
  console.log("comment", resp);
  return resp.data;
});
