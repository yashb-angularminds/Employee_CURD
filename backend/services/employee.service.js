const Employee = require("../models/employee.model");
const { ApiError } = require("../middleware/error");

const generateEmployeeId = async (orgName) => {
  // Extract first letter of each word to form initials
  const initials = orgName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  // Find the highest employee ID for this organization
  const lastEmployee = await Employee.findOne({
    empId: new RegExp(`^${initials}\\d{3}$`),
  }).sort({ empId: -1 });

  // Generate next ID
  let nextNumber = 101; // Start from 101 if no employee exists
  if (lastEmployee) {
    const lastNumber = parseInt(lastEmployee.empId.slice(-3), 10);
    nextNumber = lastNumber + 1;
  }

  // Ensure it's within 3 digits (max 999)
  if (nextNumber > 999) {
    throw new ApiError(
      400,
      "Maximum employee IDs reached for this organization."
    );
  }

  return `${initials}${nextNumber}`;
};

const createEmployee = async (employeeData, user) => {
  const email = employeeData.email;
  const checkEmployeeExists = await Employee.findOne({
    email: email,
  });

  if (checkEmployeeExists) {
    throw new ApiError(400, "Employee Already Exists");
  }
  const empId = await generateEmployeeId(user.org);
  const org = user.org;
  const addedBy = user._id;

  const newEmployee = await Employee.create({
    ...employeeData,
    empId,
    org,
    addedBy,
  });

  return newEmployee;
};

const getAllEmployees = async () => {
  return await Employee.find();
};

const getEmployeeById = async (id) => {
  const employee = await Employee.findById(id);
  if (!employee) throw new ApiError(404, "Employee not found");
  return employee;
};

const updateEmployee = async (id, updateData) => {
  const employee = await Employee.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!employee) throw new ApiError(404, "Employee not found");
  return employee;
};

const deleteEmployee = async (id) => {
  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) throw new ApiError(404, "Employee not found");
  return employee;
};

const getFilteredEmployees = async (query, userId) => {
  const {
    page = 1,
    limit = 10,
    department,
    role,
    minSalary,
    maxSalary,
    search,
    sortBy,
    sortOrder,
  } = query;

  const filters = {};

  if (department) filters.department = department;
  if (role) filters.role = role;
  if (minSalary || maxSalary) {
    filters.salary = {};
    if (minSalary) filters.salary.$gte = Number(minSalary);
    if (maxSalary) filters.salary.$lte = Number(maxSalary);
  }
  if (search) {
    filters.name = { $regex: search, $options: "i" };
  }

  // Default sorting (by name, ascending)
  let sortOptions = { empId: 1 };

  if (sortBy && ["name", "department", "salary"].includes(sortBy)) {
    sortOptions = { [sortBy]: sortOrder === "desc" ? -1 : 1 };
  }

  const employees = await Employee.find({ ...filters, addedBy: userId })
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const totalCount = await Employee.countDocuments({
    ...filters,
    addedBy: userId,
  });

  return {
    employees,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: Number(page),
    totalCount,
  };
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getFilteredEmployees,
};
