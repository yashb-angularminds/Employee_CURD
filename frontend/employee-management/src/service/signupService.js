import { fetchWithInterceptor } from "../utils/ApiErrorHandling";

const registerUser = async (formData) => {
  try {
    const data = await fetchWithInterceptor("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    throw error;
  }
};

export default registerUser;
