const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  org:{
    type:String,
    required:true
  },
  role: {
    type: String,
    default: "ADMIN",
  },
});

userSchema.pre("save", async function (next) {
  const employee = this;
  if (!employee.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employee.password, salt);
    employee.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (passwordToBeChecked) {
  try {
    const isMatched = await bcrypt.compare(passwordToBeChecked, this.password);
    return isMatched;
  } catch (error) {
    throw error;
  }
};

userSchema.methods.generateAccessToken = function () {
  console.log("Before generating token ",this);
  
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      org: this.org
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

module.exports = mongoose.model("User", userSchema);
