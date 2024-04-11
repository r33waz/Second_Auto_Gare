import { createSlice } from "@reduxjs/toolkit";
import { createMessage, getMessagesByConvId } from "./messageThunk";

const initialState = {
  data: [],
  isLoading: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessagesByConvId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMessagesByConvId.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action?.payload);
    });
    builder.addCase(getMessagesByConvId.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createMessage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createMessage.fulfilled, (state) => {
      (state.isLoading = false)
    });
    builder.addCase(createMessage.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default messageSlice.reducer;
