import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  firstname: "",
  lastname: "",
  email: "",
  phonenumber: "",
  role: "",
  islogin: "",
};

const loginslice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state._id = action.payload._id;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.phonenumber = action.payload.phonenumber;
      state.role = action.payload.role;
      state.islogin = action.payload.islogin;
    },
    logout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export default loginslice.reducer;
export const { login } = loginslice.actions;
