
import { fetchWithInterceptor } from "../utils/ApiErrorHandling";

const loginUser = async (formData) => {
  try {
    const data = await fetchWithInterceptor("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log("Login Successful:", data);
    return data;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};


export default loginUser;
