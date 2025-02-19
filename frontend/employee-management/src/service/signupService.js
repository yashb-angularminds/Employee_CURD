const API_URL = "http://localhost:5000/users/register";

const registerUser = async (formData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to Register. Please try again.");
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export default registerUser;
