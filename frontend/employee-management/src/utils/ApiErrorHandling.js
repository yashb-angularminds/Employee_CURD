const API_BASE_URL = "http://localhost:5000";

export const fetchWithInterceptor = async (
  endpoint,
  options = {},
  authRequired = false,
  isFormData = false
) => {
  console.log("In fetch");

  try {
    const method = options.method || "GET";
    console.log("Method ", method);

    let headers = {
      ...options.headers,
    };
    console.log("Headers Before: ", headers);

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    if (authRequired) {
      const token = localStorage.getItem("token");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        throw new Error("Authentication required, but no token found.");
      }
    }
    console.log("Header after auth: ", headers);

    const { body, ...filteredOptions } = options;
    const requestOptions =
      method === "GET" ? filteredOptions : { ...filteredOptions, body };
    console.log("Request Options: ", requestOptions);

    console.log(`${API_BASE_URL}${endpoint}`);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      ...requestOptions,
      headers: isFormData ? {} : headers,
    });
    console.log("Response: ", response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error.message);
    console.log(error.errors);

    if (error.message.includes("401")) {
      alert("Session expired. Redirecting to login...");
      window.location.href = "/login";
    }
    throw error;
  }
};
