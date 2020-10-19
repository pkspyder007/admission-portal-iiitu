const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Form3 = require('../models/form3.model');
const Form1 = require('../models/form1.model');
const fs = require('fs');

exports.createAdmin = async (ad) => {
  try {
    let password = Math.random().toString(16).substring(7);
    ad.password = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create(ad);
    console.log(newAdmin);
    console.log('admin created with password ' + password);
  }

  catch (err) {
    console.log(err.message);
  }
}

exports.loginAdmin = async (req, res) => {
  try {
    let admin = await Admin.findOne({ email: req.body.email })
    if (!admin) {
      return res.status(400).json({ msg: "Admin not found" })
    }

    // admin.comparePassword(req.body.password,(err,result)=>{
    //     if(err){
    //       console.error(err.message);
    //       res.status(400).json({ message: err.message });
    //       return;
    //     }

    const isPasswordTrue = await bcrypt.compare(req.body.password, admin.password);

    if (!isPasswordTrue) return res.status(400).json({ message: 'Invalid Credentials' })


    let token = jwt.sign({ id: admin._id }, process.env.ADMIN_SECRET_KEY, { expiresIn: '1d' });

    res.status(200).json({
      message: "Login successfull",
      auth: true,
      data: {
        ...admin._doc,
        password: ''
      },
      token
    })



  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: "cannot log in" })

  }
}

exports.getForm3 = async (req, res) => {
  try {
    const form3Data = await Form3.findOne({ regNo: req.params.regNo.toUpperCase() });
    if (!form3Data) {
      res.status(400).json({ message: 'No record Found!!' });
      return
    }
    res.json({
      ...form3Data._doc
    });
    return;
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

exports.getForm1 = async (req, res) => {
  try {
    const form1Data = await Form1.findOne({ regNo: req.params.regNo.toUpperCase() });
    if (!form1Data) {
      res.status(400).json({ message: 'No record Found!!' });
      return
    }
    res.json({
      ...form1Data._doc
    });
    return;
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

exports.getDocs = (req, res) => {
  const testFolder = `${process.cwd()}/uploads/${req.params.jeeRegNo}`
  fs.readdirSync(testFolder).forEach(file => {
    if (file.split(".")[0] == `${req.params.jeeRegNo}-${req.params.name}`) {
      res.sendFile(`${testFolder}/${file}`);
      return;
    }
  });
}