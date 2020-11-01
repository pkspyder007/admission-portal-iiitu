const { getRegNums, updateRegNums, sendEmail } = require("../utils/utils")
const Student = require("../models/student.model");
const Form3 = require("../models/form3.model");
const bcrypt = require('bcryptjs');
const Form1 = require("../models/form1.model");
const jwt = require("jsonwebtoken");

const stdData = require("../data/stddata.json");

exports.register = async (req, res) => {
    try {
        let std = null;
        stdData.forEach(student => {
            if(student["JEE(Main) App No"] == req.body.jeeRegNo) {
                std = student;
            }
        });

        if(!std) {
            res.status(401).json({ message: "Student record not found please check the JEE MAIN application number."});
            return;
        }

        try {
            if(std["DOB"] != req.body.dob) {
                return res.status(400).json({
                    message: "Date of Birth do not match."
                });
            }
            if(std["State of Eligibility"].trim().toLowerCase() != req.body.soe.trim().toLowerCase()) {
                return res.status(400).json({
                    message: "State of Eligibilty do not match. Please check for spaces or copy paste from website"
                });
            }
            let b = std["Program"];
            let tempStd = {
                name: std["Name"],
                regNo: '',
                jeeRegNo: std["JEE(Main) App No"],
                email: req.body.email,
                mobile: req.body.mobile,
                fatherName: req.body.fatherName,
                category: std["Category"],
                branchAlloted: '',
                fessPaid: 0,
                password: ''
            }        
            if(b == "Computer Science and Engineering (4 Years, Bachelor of Technology)") {
                tempStd.branchAlloted = "CSE"
            }
            if(b == "Electronics and Communication Engineering (4 Years, Bachelor of Technology)") {
                tempStd.branchAlloted = "ECE"
            }
            if(b == "Information Technology (4 Years, Bachelor of Technology)") {
                tempStd.branchAlloted = "IT"
            }
            let password = Math.random().toString(36).substring(7);
            tempStd.password = bcrypt.hashSync(password, 10);

            let totalStd = await Student.find({});
            
            let regNo = '2K20';
            let prevRegNums = getRegNums();
            if (tempStd.branchAlloted == 'CSE') {
                if (prevRegNums.CSE < 10) {
                    regNo = `${regNo}CSE00${prevRegNums.CSE}`
                } else if (prevRegNums.CSE < 100) {
                    egNo = `${regNo}CSE0${prevRegNums.CSE}`
                } else {
                    regNo = `${regNo}${prevRegNums.CSE}`
                }
                        }
                        if (tempStd.branchAlloted == 'IT') {
                            if (prevRegNums.IT < 10) {
                                regNo = `${regNo}IT00${prevRegNums.IT}`
                            } else if (prevRegNums.CSE < 100) {
                                egNo = `${regNo}IT0${prevRegNums.CSE}`
                            } else {
                                regNo = `${regNo}${prevRegNums.IT}`
                            }
                        }
                        if (tempStd.branchAlloted == 'ECE') {
                            if (prevRegNums.ECE < 10) {
                                regNo = `${regNo}ECE00${prevRegNums.ECE}`
                            } else if (prevRegNums.CSE < 100) {
                                egNo = `${regNo}ECE0${prevRegNums.CSE}`
                            } else {
                                regNo = `${regNo}${prevRegNums.ECE}`
                            }
                        }
                        // tempStd.isFirstLogin = false;
                        tempStd.regNo = regNo;
                        tempStd.sNo = totalStd.length + 1;

                        updateRegNums(tempStd.branchAlloted);
                        const newStudent = await Student.create(tempStd);
                        if(!newStudent) return res.status(500).json({ message: "Student could not be registered!"});
                        
                        
                        let mail = `
                        <p> Dear ${newStudent.name} , </p>
                <p>please complete your counselling process by going to our admission portal <a href="http://117.252.73.157/login">here</a> and follow the procedure.</p>
                <p>Your login credentails are : </p>
                <p>ID: ${newStudent.jeeRegNo} </p>
                <p>OTP: ${password} </p> <br />
            `;
            sendEmail(newStudent.email, 'Registration for IIIT UNA counselling.', mail)
            console.log('Student Added To Database with Following JEE registration Number : ' + newStudent.jeeRegNo + " password : " + password);
            return res.json({message: `Registration Successful! \n Check your email you registred with for further instructions \n Your credentials are : \n ID: ${newStudent.jeeRegNo} \n Password: ${password}`})
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Something went wrong. " + error.message})
        }
        
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Something went wrong. " + error.message})
    }
}

exports.createStudent = async (std) => {
    try {
        let password = Math.random().toString(36).substring(7);
        std.password = bcrypt.hashSync(password, 10);
        const newStudent = await Student.create(std);
        let mail = `
            <p> Dear ${std.name} , </p>
            <p>please complete your counselling process by going to our admission portal <a href="http://117.252.73.157/login">here</a> and follow the procedure.</p>
            <p>Your login credentails are : </p>
            <p>ID: ${std.jeeRegNo} </p>
            <p>OTP: ${password} </p> <br />
        `;
        sendEmail(std.email, 'Registration for IIIT UNA counselling.', mail)
        console.info('email: ' + std.email + ', password: ' + password);
        console.log('Student Added To Database with Following JEE registration Number : ' + newStudent.jeeRegNo);
    } catch (error) {
        console.error(error.message);
    }
}

// exports.test = (req, res) => {
//     res.status(500).json({message: 'err name'});
// }

exports.loginStudent = async (req, res) => {
    try {
        let student = await Student.findOne({ jeeRegNo: req.body.jeeRegNo });
        if (!student) {
            res.status(400).json({ message: 'Student Not Found!' });
            return;
        }

        // console.log(bcrypt.compareSync(req.body.password, student.password));
        student.comparePassword(req.body.password, (err, result) => {
            if (err) {
                console.error(err.message);
                res.status(400).json({ message: err.message });
                return;
            }
            if (result) {
                // Generate and Upadate Registration Number;
                // if (student.isFirstLogin) {
                //     try {
                //         let regNo = '2K20';
                //         let prevRegNums = getRegNums();
                //         if (student.branchAlloted == 'CSE') {
                //             if (prevRegNums.CSE < 10) {
                //                 regNo = `${regNo}CSE00${prevRegNums.CSE}`
                //             } else if (prevRegNums.CSE < 100) {
                //                 egNo = `${regNo}CSE0${prevRegNums.CSE}`
                //             } else {
                //                 regNo = `${regNo}${prevRegNums.CSE}`
                //             }
                //         }
                //         if (student.branchAlloted == 'IT') {
                //             if (prevRegNums.IT < 10) {
                //                 regNo = `${regNo}IT00${prevRegNums.IT}`
                //             } else if (prevRegNums.CSE < 100) {
                //                 egNo = `${regNo}IT0${prevRegNums.CSE}`
                //             } else {
                //                 regNo = `${regNo}${prevRegNums.IT}`
                //             }
                //         }
                //         if (student.branchAlloted == 'ECE') {
                //             if (prevRegNums.ECE < 10) {
                //                 regNo = `${regNo}ECE00${prevRegNums.ECE}`
                //             } else if (prevRegNums.CSE < 100) {
                //                 egNo = `${regNo}ECE0${prevRegNums.CSE}`
                //             } else {
                //                 regNo = `${regNo}${prevRegNums.ECE}`
                //             }
                //         }
                //         student.isFirstLogin = false;
                //         student.regNo = regNo;
                //         console.log(regNo);
                //         student.save();
                //         updateRegNums();


                //         let token = jwt.sign({ id: student.jeeRegNo }, process.env.SECRET_KEY, {
                //             // expiresIn: 86400,
                //         });
                //         res.status(200).json({ message: 'Login Successful.', auth: true, token: token, data: { ...student._doc, password: '' } });
                //         return;
                //     } catch (error) {
                //         console.error(error);
                //         res.status(500).json({ message: "Something went wrong." });
                //         return;
                //     }
                // }

                let token = jwt.sign({ id: student.jeeRegNo }, process.env.SECRET_KEY, {
                    expiresIn: 86400,
                });
                student.password = "";
                res.status(200).json({ message: 'Login Successful.', auth: true, token: token, data: student });
                return;
            } else {
                res.status(400).json({ message: 'Invalid Credentials.' });
                return;
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong." });
        return;
    }
}

exports.form3DataInput = async (req, res) => {
    try {
        let std = await Student.findOne({ jeeRegNo: req.userId });
        if (!std) {
            res.status(400).json({ message: "Current user's jee not found in the database." });
            return;
        }

        let newForm3 = await Form3.create(req.body);

        std.step1 = false;
        std.step2 = true;
        std.save();

        if (!newForm3) {
            res.status(500).json({ message: "Current user's jee not found in the database." });
            return;
        }

        res.status(200).json({ message: "Data Added Succesfully." });
        return;

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong." });
        return;
    }
}

exports.getForm3 = async (req, res) => {
    try {
        let std = await Form3.findOne({ regNo: req.params.regNo });
        if (!std) {
            res.status(400).json({ message: "Current user's jee number not found in the database." });
            return;
        }

        res.status(200).json({ std });
        return;

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong." });
        return;
    }
}


exports.form1DataInput = async (req, res) => {
    try {
        let std = await Student.findOne({ jeeRegNo: req.userId });
        if (!std) {
            res.status(400).json({ message: "Current user's jee not found in the database." });
            return;
        }

        let temp = await Form1.find({ regNo: std.regNo });
        if (temp) {
            res.status(400).json({ message: "Form has been already submitted" });
            return;
        }
        let newForm1 = await Form1.create({ docList: req.body, regNo: std.regNo, jeeRegNo: req.userId });

        std.step2 = false;
        std.step3 = true;
        std.save();

        if (!newForm1) {
            res.status(500).json({ message: "Current user's jee reg, no. not found in the database." });
            return;
        }

        res.status(200).json({ message: "Data Added Succesfully." });
        return;

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong." });
        return;
    }
}

exports.form1Data = async (req, res) => {
    try {
        let docList = await Form1.findOne({ jeeRegNo: req.userId });
        res.status(200).json({ docList: docList.docList });
        return
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "No data found" });
        return;
    }
}

exports.updateSteps = async (req, res) => {
    try {
        let newStd = await Student.findOneAndUpdate({ jeeRegNo: req.userId }, { ...req.body });
        res.status(200).json({
            ...newStd._doc,
            password: ''
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(err.message);
    }
}

exports.float = async (req, res) => {
    try {
        let newStd = await Student.findOneAndUpdate({ jeeRegNo: req.userId }, { will: 'FLOAT', step5: false, doc: Date().toString('dd-MM-yyyy'), completed: true });

        let mailComplete = `
                <p> Dear ${newStd.name} , </p>
                <p>You have completed your registration process for insitute counselling.</p>
                <p>Take a print of your Admit card from profile section of admission portal </p>
            `;
        sendEmail(newStd.email, 'Admission appliaction process update', mailComplete);
        sendEmail("so@iiitu.ac.in", 'Admission appliaction process update', `Student with registration Number: ${newStd.regNo} compeleted the process.`);
        res.status(200).json({
            ...newStd._doc,
            password: ''
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error.message);
    }
}

exports.freeze = async (req, res) => {

    try {
        let newStd = await Student.findOneAndUpdate({ jeeRegNo: req.userId }, { will: 'FREEZE', step5: false, doc: Date().toString('dd-MM-yyyy'), completed: true });
        try {
            let form3Data = await Form3.findOneAndUpdate({ regNo: newStd.regNo }, { ...req.body });
            let mailComplete = `
            <p> Dear ${newStd.name} , </p>
            <p>You have completed your registration process for insitute counselling.</p>
            <p>Take a print of your Admit card from profile section of admission portal </p>
            `;
            sendEmail(newStd.email, 'Admission appliaction process update', mailComplete)
            sendEmail("so@iiitu.ac.in", 'Admission appliaction process update', `Student with registration Number: ${newStd.regNo} compeleted the process.`);
            res.status(200).json({
                ...newStd._doc,
                password: ''
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.error(err.message);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error.message);
    }


}