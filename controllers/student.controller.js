const { getRegNums, updateRegNums, sendEmail } = require("../utils/utils")
const Student = require("../models/student.model");
const Form3 = require("../models/form3.model");

exports.createStudent = async (std) => {
    try {
        let password = Math.random().toString(36).substring(7);
        std.password = password;
        const newStudent = await Student.create(std);
        let mail = `
            <p> Dear ${std.name} , </p>
            <p>please complete your counselling process by going to our admission portal and follow the procedure.</p>
            <p>Your login credentails are : </p>
            <p>ID: ${std.jeeRegNo} </p>
            <p>OTP: ${password} </p> <br />
            <p>Please change your OTP after loggin in. </p>
        `;
        sendEmail(std.email, 'Registration for IIIT UNA counselling.', mail)
        console.info('email: '+ std.email + ', password: ' + password);
        console.log('Student Added To Database with Following JEE registration Number : ' + newStudent.jeeRegNo);
    } catch (error) {
        console.error(error.message);
    }
}

exports.loginStudent = async (req, res) => {
    try {
        let student = await Student.findOne({ jeeRegNo: req.body.jeeRegNo });
        if(!student) {
            res.status(400).json({ message: 'Student Not Found!'});
            return;
        }
        student.comparePassword(req.body.password, (err, res) => {
            if(err) {
                console.error(err.message);
                res.status(400).json({ message: err.message});
                return;
            }
            if(res) {
                // Generate and Upadate Registration Number;
                student.password = "";
                if(student.isFirstLogin) {
                   try {
                    let regNo = '2K20';
                    let prevRegNums = getRegNums(); 
                    if(student.branchAlloted = 'CSE') {
                        if(prevRegNums.CSE < 10) {
                            regNo = `${regNo}0${prevRegNums.CSE}`
                        } else {
                            regNo = `${regNo}${prevRegNums.CSE}`
                        }
                    }
                    if(student.branchAlloted = 'IT') {
                        if(prevRegNums.IT < 10) {
                            regNo = `${regNo}0${prevRegNums.IT}`
                        } else {
                            regNo = `${regNo}${prevRegNums.IT}`
                        }
                    }
                    if(student.branchAlloted = 'ECE') {
                        if(prevRegNums.ECE < 10) {
                            regNo = `${regNo}0${prevRegNums.ECE}`
                        } else {
                            regNo = `${regNo}${prevRegNums.ECE}`
                        }
                    }
                    student.isFirstLogin = false;
                    student.regNo = regNo;
                    student.save();
                    updateRegNums();

                    let token = jwt.sign({ id: student.jeeRegNo }, process.env.SECRET_KEY, {
                        expiresIn: 86400,
                    });
                    res.status(200).json({ message: 'Login Successful.', auth: true, token: token, data: student});
                    return;
                   } catch (error) {
                       console.error(error);
                       res.status(500).json({ message: "Something went wrong."});
                       return;
                   }
                }

                let token = jwt.sign({ id: student.jeeRegNo }, process.env.SECRET_KEY, {
                    expiresIn: 86400,
                });

                res.status(200).json({ message: 'Login Successful.', auth: true, token: token, data: student});
                return;
            } else {
                res.status(400).json({ message: 'Invalid Credentials.'});
                return;
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong."});
        return;
    }
}

exports.form3DataInput = async (req, res) => {
    try {
        let std = await Student.findOne({ jeeRegNo: req.userId});
        if(!std) {
            res.status(400).json({message: "Current user's jee not found in the database."});
            return;
        }

        let newForm3 = await Form3.create(req.data.body);

        if(!newForm3) {
            res.status(500).json({message: "Current user's jee not found in the database."});
            return;
        }

        res.status(200).json({ message: "Data Added Succesfully."});
        return;

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong."});
        return;
    }
}