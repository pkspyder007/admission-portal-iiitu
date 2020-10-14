//Import the dependencies
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//Create User schema and model
const StudentSchema = new Schema({
  name: {
    type: String,
    required: "Name Cannot be empty.",
  },
  regNo: {
    type: String,
    unique: "Registration Number conflict consult Administrator"
  },
  jeeRegNo: {
    type: String,
    unique: 'Jee Registration Number already exists.',
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
    // required: "Password cannot be empty",
  },
  hasChangedPassword: {
    type: Boolean,
    defaut: false
  },
  isFirstLogin: {
    type: Boolean,
    default: true
  },
  step1: {
    type: Boolean,
    default: true
  },
  step2: {
    type: Boolean,
    default: false
  },
  step3: {
    type: Boolean,
    default: false
  },
  step4: {
    type: Boolean,
    default: false
  },
  step5: {
    type: Boolean,
    default: false
  },
  will: {
    type: String,
    default: "FREEZE-DEFAULT"
  },
  completed: {
    type: Boolean,
    default: false
  },
  doc: {
    type: String,
    default: 'Same as in Form 3'
  }

});

// StudentSchema.pre("save", function(next) {
//     if(!this.isModified("password")) {
//         return next();
//     }
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
// });

StudentSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

StudentSchema.plugin(uniqueValidator)

//Export the schema
const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;