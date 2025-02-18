import { useState } from "react";

const EmployeeForm = ({ onSubmit, initialValues }) => {
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={employee.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="department"
        value={employee.department}
        onChange={handleChange}
        placeholder="Department"
        required
      />
      <input
        type="number"
        name="salary"
        value={employee.salary}
        onChange={handleChange}
        placeholder="Salary"
        required
      />
      <input
        type="text"
        name="role"
        value={employee.role}
        onChange={handleChange}
        placeholder="Role"
        required
      />
      <input
        type="email"
        name="email"
        value={employee.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <button type="submit">Save</button>
      
    </form>
  );
};

export default EmployeeForm;
