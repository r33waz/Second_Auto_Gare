import { createSlice } from "@reduxjs/toolkit";
import { createFeedback } from "./feedBackThunk";

const initialState = {
  laoding: false,
  feedBackData: [],
  error: [],
};

const feedBackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createFeedback.pending, (state) => {
      state.laoding = true;
    });
    builder.addCase(createFeedback.fulfilled, (state) => {
      state.laoding = false;
    });
    builder.addCase(createFeedback.rejected, (state) => {
      state.laoding = false;
    });
  },
});

export default feedBackSlice.reducer;
