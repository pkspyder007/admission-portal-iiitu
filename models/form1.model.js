//Import the dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create User schema and model
const Form1Schema = new Schema({
  docList: {
    type: Array,
    required: "Document list cannot be empty."
  },
  jeeRegNo: {
    type: String,
    required: "JEE reg no. cannot be empty."
  }
});

//Export the schema
const Form1 = mongoose.model("Form1", Form1Schema);
module.exports = Form1;