import { createSlice } from "@reduxjs/toolkit";
import {singleUserConvo}  from "./conversationThunk";


const initialState = {
  isLoading: false,
  data: [],
  singleConservation: null,
};

const connvoSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(singleUserConvo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(singleUserConvo.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
    });
    builder.addCase(singleUserConvo.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default connvoSlice.reducer;
