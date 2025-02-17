const { userService } = require("../services/index");
const asyncHandler = require("../utils/asyncHandler");
const { ApiError } = require("../middleware/error");

const registerUser = asyncHandler(async (req, res) => {
  const createdUser = await userService.register(req.body);
  if (!createdUser) {
    throw new ApiError(400, "User registration failed");
  }

  res.status(201).json({
    message: "User registered successfully",
    createdUser,
  });
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const { user, token } = await userService.login(email, password);
  res.status(200).json({ message: "Login successful", user, token });
});

module.exports = { registerUser, loginUser };
