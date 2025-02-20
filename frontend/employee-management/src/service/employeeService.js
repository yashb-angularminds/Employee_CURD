import { fetchWithInterceptor } from "../utils/ApiErrorHandling";

const getEmployee = async (queryParams) => {
  try {
    console.log("In get Employee");
    console.log("Query Params:", queryParams);

    const queryString = new URLSearchParams(queryParams).toString();
    const urlWithParams = `/employee/?${queryString}`;
    console.log("Final Request URL:", urlWithParams);

    const data = await fetchWithInterceptor(
      urlWithParams,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
      true
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const addEmployee = async (employeeData) => {
  try {
    const data = await fetchWithInterceptor(
      "/employee/createEmployee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      },
      true
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async (employeeData, id) => {
  try {
    const data = await fetchWithInterceptor(
      `/employee/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      },
      true
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async (id) => {
  try {
    const data = await fetchWithInterceptor(
      `/employee/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
      true
    );
    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export default { getEmployee, addEmployee, updateEmployee, deleteEmployee };
