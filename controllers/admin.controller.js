const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAdmin = async(ad)=>{
    try{
        let password = Math.random().toString(16).substring(7);
        ad.password = await bcrypt.hash(password,10);
        const newAdmin = await Admin.create(ad);
        console.log(newAdmin);
        console.log('admin created with password '+password);
      }

    catch(err){
      console.log(err.message);
    }
}

exports.loginAdmin = async (req,res) => {
  try{
    let admin = await Admin.findOne({email:req.body.email})
    if(!admin){
      return res.status(400).json({msg:"Admin not found"})
    }

    // admin.comparePassword(req.body.password,(err,result)=>{
    //     if(err){
    //       console.error(err.message);
    //       res.status(400).json({ message: err.message });
    //       return;
    //     }

    const isPasswordTrue =await bcrypt.compare(req.body.password,admin.password);

    if(!isPasswordTrue) return res.status(400).json({message:'Invalid Credentials'})


          let token = jwt.sign({id : admin._id},process.env.SECRET_KEY,{expiresIn:'1h'});
  
          res.status(200).json({
            message:"Login successfull",
            auth : true,
            data : {
             ...admin._doc,
             password:''
            },
            token
          })
        

     
  } catch(err){
    console.log(err.message);
    return res.status(400).json({message:"cannot log in"})

  }
}