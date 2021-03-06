const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const Form3Schema = new Schema({
    date: {
        type: String,
        default: new Date().toString('dd-MM-yyyy')
    },
    regNo: {
        type: String,
        required: "Registration Number cannot be empty"
    },
    name: {
        type: String,
        required: "Name cannot be empty."
    },
    email: {
        type: String,
        required: "Email cannot be empty."
    },
    dob: {
        type: String,
        required: "DOB cannot be empty."
    },
    religion: {
        type: String,
        required: "Religion cannot be empty."
    },
    gender: {
        type: String,
        required: "Gender cannot be empty."
    },
    mainCategory: {
        type: String,
        required: "Main category cannot be empty."
    },
    studentMobile: {
        type: String,
        required: "Student mobile cannot be empty."
    },
    studentAadharNo: {
        type: String,
        required: "Student Aadhar no. cannot be empty."
    },
    areaType: {
        type: String,
        required: "Area type cannot be empty."
    },
    state: {
        type: String,
        required: "State cannot be empty."
    },
    country: {
        type: String,
        required: "Country cannot be empty."
    },
    correspondingAddress: {
        type: String,
        required: "Corresponding address cannot be empty."
    },
    correspondingPin: {
        type: String,
        required: "Corresponding PIN cannot be empty."
    },
    permanentAddress: {
        type: String,
        required: "Permanent address cannot be empty."
    },
    permanentPin: {
        type: String,
        required: "Permanent PIN cannot be empty."
    },
    nearestRailwayStation: {
        type: String,
        required: "RAilway Station cannot be empty."
    },
    jeeMainRoll: {
        type: String,
        unique: "A record with given JEE Main roll number already exists.",
        required: "Jee Main roll no. cannot be empty."
    },
    jeeMainScore: {
        type: Number,
        required: "Jee Main score cannot be empty."
    },
    jeeMainAirCrl: {
        type: Number,
        required: "Jee Main AIR-CRL cannot be empty."
    },
    jeeMainAirCat: {
        type: Number,
        required: "Jee Main AIR-Category cannot be empty."
    },
    admittedCategory: {
        type: String,
        required: "Admitted category cannot be empty."
    },
    countryFrom12: {
        type: String,
        required: "Country from 10 + 2 passed cannot be empty."
    },
    stateFrom12: {
        type: String,
        required: "State from 10 + 2 passed cannot be empty."
    },
    percentage12: {
        type: Number,
        required: "10+2 percentage cannot be empty."
    },
    yearPassing12: {
        type: String,
        required: "10+2 passing year cannot be empty."
    },
    typeOfSchool: {
        type: String,
        required: "School type  cannot be empty."
    },
    areaOfSchool: {
        type: String,
        required: "School area type cannot be empty."
    },
    schoolName12: {
        type: String,
        required: "10+2 school name can not be used."
    },
    board12: {
        type: String,
        required: "10+2 Board cannot be empty."
    },
    ugProgram: {
        type: String,
        default: "B.Tech"
    },
    branch: {
        type: String,
        required: "Branch cannot be empty."
    },
    hosteller: {
        type: String,
        default: "Yes"
    },
    hostelName: {
        type: String,
        default: 'DEFAULT'
        // required: "Hostel Type name cannot be empty."
    },
    fatherName: {
        type: String,
        required: "Father's name cannot be empty."
    },
    motherName: {
        type: String,
        required: "Mother's name cannot be empty."
    },
    gaurdianName: {
        type: String,
        default: ""
        // required: "Gaurdian's name cannot be empty."
    },
    fatherMobile: {
        type: String,
        required: "Father's mobile cannot be empty."
    },
    motherMobile: {
        type: String,
        required: "Mother's mobile cannot be empty."
    },
    gaurdianMobile: {
        type: String,
        default: ""
        // required: "Gaurdian's mobile cannot be empty."
    },
    fatherEmail: {
        type: String,
        default: ""
        // required: "Father's Email cannot be empty."
    },
    motherEmail: {
        type: String,
        default: ""
        // required: "Mother's Email cannot be empty."
    },
    gaurdianEmail: {
        type: String,
        default: ""
        // required: "Gaurdian's Email cannot be empty."
    },
    annualFamilyIncome: {
        type: String,
        required: "Annual family income cannot be empty."
    },
    josaaFeeAmount: {
        type: Number,
        // required: "Josaa fee amount cannot be empty."
    },
    josaaFeeDate: {
        type: String,
        // required: "Josaa fee Date cannot be empty."
    },
    instituteFeeAmount: {
        type: Number,
        // required: "Institute fee amount cannot be empty."
    },
    instituteFeeDate: {
        type: String,
        // required: "Institute fee Date cannot be empty."
    },
    instituteFeeReceiptNo: {
        type: String,
        // required: "Institute fee Recipt no. cannot be empty."
    },
    institutePartialFeeAmount: {
        type: Number,
        // required: "Institute fee amount cannot be empty."
    },
    institutePartialFeeDate: {
        type: String,
        // required: "Institute fee Date cannot be empty."
    },
    institutePartialFeeReceiptNo: {
        type: String,
        // required: "Institute fee Recipt no. cannot be empty."
    },
    totalFee: {
        type: Number,
        default: 109900
        // required: "Total fee amount cannot be empty."
    },
    hostelFeeAmount: {
        type: Number,
        // required: "hostel fee amount cannot be empty."
    },
    hostelFeeDate: {
        type: String,
        // required: "hostel fee Date cannot be empty."
    },
    hotelFeeReceiptNo: {
        type: String,
        // required: "Hostel fee Recipt no. cannot be empty."
    },
});

Form3Schema.plugin(uniqueValidator)


//Export the schema
const Form3 = mongoose.model("Form3", Form3Schema);
module.exports = Form3;