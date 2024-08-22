import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: null,
  email: null,
  address: null,
  phoneNumber: null,
  profilePicture: null,
  token: null,
  userType: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, name, email, address, phoneNumber, profilePicture, token, userType } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.address = address;
      state.phoneNumber = phoneNumber;
      state.profilePicture = profilePicture;
      state.token = token;
      state.userType = userType;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.address = null;
      state.phoneNumber = null;
      state.profilePicture = null;
      state.token = null;
      state.userType = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

// Selectors
export const selectUserId = (state) => state.auth.id;
export const selectUserName = (state) => state.auth.name;
export const selectUserEmail = (state) => state.auth.email;
export const selectUserAddress = (state) => state.auth.address;
export const selectUserPhoneNumber = (state) => state.auth.phoneNumber;
export const selectUserProfilePicture = (state) => state.auth.profilePicture;
export const selectUserToken = (state) => state.auth.token;
export const selectUserType = (state) => state.auth.userType;

export default authSlice.reducer;