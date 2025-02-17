const express = require("express");
const { userController } = require("../controller/index");
const router = express.Router();
const validate = require("../middleware/validate");
const validation = require("../validations/index");

router
  .route("/login")
  .post(validate(validation.authValidation.login), userController.loginUser);

module.exports = router;
