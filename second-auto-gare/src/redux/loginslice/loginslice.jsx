import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userLogut } from "./loginThunk";

const initialState = {
  loading: false,
  login: null,
  authenticate: false,
};

const loginslice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.authenticate = true;
      state.login = action.payload;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = false;
      state.data = null
      state.authenticate = false;
    });

    //for logout
    builder.addCase(userLogut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogut.fulfilled, (state) => {
      state.loading = false;
      state.login = null;
    });
    builder.addCase(userLogut.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default loginslice.reducer;
