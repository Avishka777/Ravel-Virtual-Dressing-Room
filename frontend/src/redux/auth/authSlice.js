import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  email: '',
  phone: '',
  accessToken: '',
  refreshToken: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    clearUser: (state) => {
      Object.keys(initialState).forEach(key => {
        state[key] = initialState[key];
      });
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

// Selectors
export const selectUserName = state => state.auth.name;
export const selectUserEmail = state => state.auth.email;
export const selectUserPhone = state => state.auth.phone;
export const selectUserAccessToken = state => state.auth.accessToken;
export const selectUserRefreshToken = state => state.auth.refreshToken;

export default authSlice.reducer;
