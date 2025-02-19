import React, { useEffect, useState } from "react";
import loginUser from "../../service/authService";
import "./login.css";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Login Data:", formData);
    try {
      const data = await loginUser(formData);
      console.log("Login successful:", data);
      setFormData({
        email: "",
        password: "",
      });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card p-4 rounded shadow">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              name="email"
              type="text"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="mt-3 text-center">
          <p>
            Dont have account? <a href="/signup">Register Here</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginComponent;
