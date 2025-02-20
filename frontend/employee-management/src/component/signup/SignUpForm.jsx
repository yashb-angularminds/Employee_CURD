import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import registerUser from "../../service/signupService";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    org: "",
  });

  const handleChange = (e) => {
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    try {
      console.log(signUpForm);

      const data = await registerUser(signUpForm);

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="w-25">
        <h2 className="mb-4">Signup Form</h2>
        {error && <p className="error text-danger text-center mt-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={signUpForm.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={signUpForm.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={signUpForm.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Organization</label>
            <input
              type="text"
              className="form-control"
              name="org"
              value={signUpForm.org}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Signup
          </button>
          <div className="text-center">
            <span>
              Already have an account? <a href="/login">Login Here</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
