const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createUser = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().custom(password).required(),
  org: Joi.string().required(),
});

module.exports = { createUser };
