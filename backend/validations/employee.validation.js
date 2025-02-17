const Joi = require("joi");
const { objectId } = require("./custom.validation");

const employeeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  department: Joi.string().required(),
  salary: Joi.number().min(0).required(),
  role: Joi.string().valid("Manager", "Developer", "HR").required(),
  email: Joi.string().required().email(),
});

const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  department: Joi.string(),
  salary: Joi.number().min(0),
  role: Joi.string().valid("Manager", "Developer", "HR"),
  email: Joi.string().email(),
});

module.exports = { employeeSchema, updateEmployeeSchema };
