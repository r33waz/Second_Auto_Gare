import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: [],
  vehicle: [],
};

const loginslice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.login = action.payload;
    },
    logout: (state, action) => {
      state.login = action.payload;
    },
  },
});

export default loginslice.reducer;
export const { login, logout } = loginslice.actions;
