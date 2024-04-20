import { main_uri } from "../../service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const postComment = createAsyncThunk("postComment", async (comment) => {
  const resp = await main_uri.post("/api/v1/comment", comment);
  console.log("comment", resp);
  return resp.data;
});
