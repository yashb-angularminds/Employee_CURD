const express = require("express");
const { userController } = require("../controller/index");
const router = express.Router();
const validate = require("../middleware/validate");
const validation = require("../validations/index");

router
  .route("/register")
  .post(
    validate(validation.userValidation.createUser),
    userController.registerUser
  );

module.exports = router;
