const API_URL = "http://localhost:5000/employee/";

const getEmployee = async (token, queryParams) => {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const urlWithParams = `${API_URL}?${queryString}`;
    const response = await fetch(urlWithParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get Employee");
    }

    return await response.json();
  } catch (error) {
    console.error("Employee error:", error);
    throw error;
  }
};

const addEmployee = async (token, employeeData) => {
  try {
    const response = await fetch(`${API_URL}/createEmployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error("Failed to get Employee");
    }

    return await response.json();
  } catch (error) {
    console.error("Employee error:", error);
    throw error;
  }
};

const updateEmployee = async (token, employeeData, id) => {
  try {
    const response = await fetch(`${API_URL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error("Failed to get Employee");
    }

    return await response.json();
  } catch (error) {
    console.error("Employee error:", error);
    throw error;
  }
};

const deleteEmployee = async (token, id) => {
  try {
    const response = await fetch(`${API_URL}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get Employee");
    }

    return await response.json();
  } catch (error) {
    console.error("Employee error:", error);
    throw error;
  }
};

export default { getEmployee, addEmployee, updateEmployee, deleteEmployee };
