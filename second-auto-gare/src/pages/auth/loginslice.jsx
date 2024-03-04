import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  phonenumber: "",
  role: "",
  islogin: "",
  photo: [],
};

const loginslice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.islogin = action.payload.islogin;
      state.photo = action.payload.photo;
    },
    logout: (state) => {
      state.id = "";
      state.firstname = "";
      state.lastname = "";
      state.email = "";
      state.role = "";
      state.islogin = "";
    },
  },
});

export default loginslice.reducer;
export const { login, logout } = loginslice.actions;
