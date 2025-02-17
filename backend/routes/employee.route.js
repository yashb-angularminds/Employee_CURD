const express = require("express");
const { employeeController } = require("../controller/index");
const authMiddleware = require("../middleware/auth");
const validate = require("../middleware/validate")
const {employeeValidation} = require("../validations/index");

const router = express.Router();


router.post("/createEmployee", authMiddleware, validate(employeeValidation.employeeSchema), employeeController.createEmployeeHandler);

router.get("/:id", authMiddleware, employeeController.getEmployeeByIdHandler);

router.put("/:id", authMiddleware, validate(employeeValidation.updateEmployeeSchema), employeeController.updateEmployeeHandler);

router.delete("/:id", authMiddleware, employeeController.deleteEmployeeHandler);

router.get("/", authMiddleware, employeeController.getFilteredEmployeesHandler);


module.exports = router;
