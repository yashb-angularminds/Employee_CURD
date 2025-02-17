const User = require("../models/user.model");
const { ApiError } = require("../middleware/error");

const register = async (userBody) => {
  const email = userBody.email;
  const checkUserExists = await User.findOne({ email: email });

  if (checkUserExists) {
    throw new ApiError(400, "User Already Exists");
  }

  const createdUser = await User.create(userBody);
  const returnUser = await User.findById(createdUser._id).select("-password");

  return returnUser;
};
const login = async (email, enteredPassword) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await user.comparePassword(enteredPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = user.generateAccessToken();
  const {password, __v,...restUser} = user.toObject();
  return { user: restUser, token };
};
module.exports = { register, login };
