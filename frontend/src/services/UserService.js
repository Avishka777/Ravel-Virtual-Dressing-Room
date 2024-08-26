/* eslint-disable no-useless-catch */
import { get, post } from "../app/apiManager";

class UserService {
  // SignIn User
  static async signIn({ email, password }) {
    try {
      const signInResponse = await post({
        path: "user/login",
        requestBody: {
          email,
          password,
        },
      });

      return signInResponse;
    } catch (error) {
      console.error("SignIn Error:", error.message);
      throw error;
    }
  }

  // Register User
  static async signUp(formData) {
    try {
      const response = await post({
        path: "user",
        requestBody: formData,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Fetch User Details
  static async getAllUsers() {
    try {
      const response = await get({ path: "user" });
      return response;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  }
}

export default UserService;
