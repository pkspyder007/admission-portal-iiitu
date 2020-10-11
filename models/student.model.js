//Import the dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create User schema and model
const StudentSchema = new Schema({
  name: {
    type: String,
    required: "Name Cannot be empty.",
  },
  regNo: {
    type: String,
  },
  JeeRegNo: {
    type: String,
    required: "JEE Mains Registration Cannot be empty.",
  },
  email: {
    type: String,
    required: 'Email cannot be empty.'
  },
  mobile: {
    type: String,
    required: "Mobile cannot be empty."
  },
  category: {
    type: String,
    required: "Category cannot be empty."
  },
  fatherName: {
      type: String,
      required: "Father's Name cannot be empty."
  },
  branchAlloted: {
      type: String,
      required: "Branch cannot be empty."
  },
  feesPaid: {
      type: Number,
      reuired: "Fees paid cannot be empty."
  },
  password: {
      type: String,
      required: "Password cannot be empty",
  },
  firstLogin: {
      type: Boolean,
      defaut: true
  }
});

//Export the schema
const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;