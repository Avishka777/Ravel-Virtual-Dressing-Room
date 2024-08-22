import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setUser } from "../redux/auth/authSlice";
import registrationReducer from "../redux/auth/registrationSlice";

// Configure the store with the reducers
const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
  },
});

// Retrieve user data from localStorage and update the store
const userData = localStorage.getItem("userData");
if (userData) {
  store.dispatch(setUser(JSON.parse(userData)));
}

export default store;