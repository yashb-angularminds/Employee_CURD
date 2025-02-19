import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeForm = ({ onSubmit, initialValues, onClose }) => {
  const [employee, setEmployee] = useState(
    initialValues || {
      name: "",
      department: "",
      salary: "",
      role: "",
      email: "",
    }
  );

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employee);
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">Employee Form</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Department"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Salary"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  name="role"
                  value={employee.role}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Role"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Email"
                  required
                />
              </div>

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
