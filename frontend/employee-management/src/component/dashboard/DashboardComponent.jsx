import React, { useEffect, useState } from "react";
import employeeService from "../../service/employeeService";
import EmployeeForm from "../employeeForm/EmployeeForm";

function DashboardComponent() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [queryParams, setqueryParams] = useState({
    department: "",
    sortBy: "",
    sortOrder: "",
    limit: 10,
    page: 1,
    role: "",
    search: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEmployees = async (page) => {
      try {
        const data = await employeeService.getEmployee(token, queryParams);
        setEmployees(data.employees);
        console.log(data);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
        setCurrentPage(queryParams.page);
      } catch (error) {
        setError(error.message);
      }
    };

    if (token) {
      fetchEmployees(currentPage);
    }
  }, [token, currentPage, queryParams,]);

  const handleFilterChange = (field, value) => {
    setqueryParams((prevParams) => ({
      ...prevParams,
      [field]: value,
      page: 1,
    }));
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setqueryParams((prevParams) => ({
        ...prevParams,
        page: page,
      }));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setqueryParams((prevParams) => ({
        ...prevParams,
        page: currentPage - 1,
      }));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setqueryParams((prevParams) => ({
        ...prevParams,
        page: currentPage + 1,
      }));
    }
  };
  const handleAddClick = () => {
    setEditEmployee(null); // Reset values for adding new employee
    setShowForm(true);
  };

  const handleEditClick = (employee) => {
    setEditEmployee(employee); // Set values for editing
    setShowForm(true);
  };

  const handleSubmit = async (employeeData) => {
    if (editEmployee) {
      console.log("Updating Employee:", employeeData);
      // Call update API here
    } else {
      console.log("Adding Employee:", employeeData);
      const data = await employeeService.addEmployee(token, employeeData);
      console.log(data);
    }
    setShowForm(false); // Close form after submit
  };
  const onCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Employee Dashboard </h1>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search employees"
          value={queryParams.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>

      {/* Filter Bar */}
      <div className="mb-3 d-flex justify-content-between align-item-center ">
        <div className="mb-3">
          <select
            className="form-select"
            onChange={(e) => handleFilterChange("department", e.target.value)}
          >
            <option value="">Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
          </select>
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            onChange={(e) => handleFilterChange("limit", e.target.value)}
          >
            <option value="">Limit</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            onChange={(e) => handleFilterChange("role", e.target.value)}
          >
            <option value="">Role</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
          </select>
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="department">Department</option>
            <option value="salary">Salary</option>
          </select>
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
          >
            <option value="">Sort Order</option>
            <option value="asce">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Add Button */}
      <div className="mb-3 text-center">
        <button className="btn btn-primary" onClick={handleAddClick}>
          Add Employee
        </button>
      </div>

      <div className="d-flex">
        {showForm && (
          <>
            <EmployeeForm
              onSubmit={handleSubmit}
              initialValues={
                editEmployee || { name: "", department: "", salary: "" }
              }
            />
            <button
              onClick={() => {
                setShowForm(false);
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* Employee List */}
      <table className="mt-5 table text-center">
        <thead>
          <tr>
            <td>Emp ID</td>
            <td>Name</td>
            <td>Department</td>
            <td>Salary</td>
            <td>Email</td>
            <td>Role</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.empId}>
              <td>{employee.empId}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mx-1"
                  onClick={() =>
                    handleEditClick({
                      name: `${employee.name}`,
                      department: `${employee.department}`,
                      salary: `${employee.salary}`,
                      role: `${employee.role}`,
                      email: `${employee.email}`,
                    })
                  }
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  // onClick={() => deleteEmployee(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="mt-3" aria-label="Page navigation example ">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              tabIndex="-1"
              onClick={handlePrevious}
            >
              Previous
            </a>
          </li>
          {[...Array(totalPages).keys()].map((index) => {
            const pageNumber = index + 1;
            return (
              <li
                key={pageNumber}
                className={`page-item ${
                  currentPage === pageNumber ? "active" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </a>
              </li>
            );
          })}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <a className="page-link" href="#" onClick={handleNext}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default DashboardComponent;
