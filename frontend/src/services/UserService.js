/* eslint-disable no-useless-catch */
import { post } from "../app/apiManager";

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
}

export default UserService;
