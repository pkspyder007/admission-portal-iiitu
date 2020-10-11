const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Form3Schema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    regNo: {
        type: String,
    }
});

//Export the schema
const Product = mongoose.model("Product", Form3Schema);
module.exports = Product;