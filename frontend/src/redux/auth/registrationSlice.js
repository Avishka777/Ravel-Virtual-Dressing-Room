// registration-slice.js
import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
    profilePicture:"",
  },
  reducers: {
    setStepOne: (state, action) => {
      const { name, email, address, phoneNumber, password ,profilePicture} = action.payload;
      state.name = name;
      state.email = email;
      state.address = address;
      state.phoneNumber = phoneNumber;
      state.password = password;
      state.profilePicture = profilePicture;
    },
  },
});

export const { setStepOne } = registrationSlice.actions;

export default registrationSlice.reducer;