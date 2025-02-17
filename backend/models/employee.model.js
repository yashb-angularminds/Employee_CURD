const { types } = require("joi");
const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  role: { type: String, enum: ["Manager", "Developer", "HR"], required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  org:{
    type:String,
    required:true
  },
  empId:{
    type:String,
    unique:true,
    required:true
  }
});

module.exports = mongoose.model("Employee", employeeSchema);
