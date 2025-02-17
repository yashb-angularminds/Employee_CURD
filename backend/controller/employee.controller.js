const { employeeService } = require("../services/index");
const asyncHandler = require("../utils/asyncHandler");

const createEmployeeHandler = asyncHandler(async (req, res) => {
  const employee = await employeeService.createEmployee(req.body, req.user.org);
  res.status(201).json({ message: "Employee created", employee });
});

const getAllEmployeesHandler = asyncHandler(async (req, res) => {
  const employees = await employeeService.getAllEmployees();
  res.status(200).json(employees);
});

const getEmployeeByIdHandler = asyncHandler(async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);
  res.status(200).json(employee);
});

const updateEmployeeHandler = asyncHandler(async (req, res) => {
  const employee = await employeeService.updateEmployee(
    req.params.id,
    req.body
  );
  res.status(200).json({ message: "Employee updated", employee });
});

const deleteEmployeeHandler = asyncHandler(async (req, res) => {
  await employeeService.deleteEmployee(req.params.id);
  res.status(200).json({ message: "Employee deleted" });
});

const getFilteredEmployeesHandler = asyncHandler(async (req, res) => {
  const result = await employeeService.getFilteredEmployees(req.query);
  res.status(200).json(result);
});

module.exports = {
  createEmployeeHandler,
  getAllEmployeesHandler,
  getEmployeeByIdHandler,
  updateEmployeeHandler,
  deleteEmployeeHandler,
  getFilteredEmployeesHandler,
};
