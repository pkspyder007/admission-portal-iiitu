const mongoose = require('mongoose');

const RegNoSchema = new mongoose.Schema({
  index: {
    type: String,
    default: "BRANCH",
    unique: true
  },
  CSE: {
    type: Number,
    default: 0
  },
  IT: {
    type: Number,
    default: 0
  },
  ECE: {
    type: Number,
    default: 0
  }
});

const RegNo = mongoose.model('regNo', RegNoSchema);
module.exports = RegNo;