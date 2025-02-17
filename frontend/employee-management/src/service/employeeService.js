const API_URL = "http://localhost:5000/employee/";

const getEmployee = async (token) => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Token: ", token);

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to get Employee");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Employee error:", error);
    throw error;
  }
};

export default getEmployee;
