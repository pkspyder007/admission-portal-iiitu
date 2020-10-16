const express = require('express');
const router = express.Router();
const { loginAdmin, getForm3, getForm1, getDocs } = require("../controllers/admin.controller");
const verifyAdminToken = require('../middlewares/authAdmin');

router.post('/login', loginAdmin);
router.get('/docs/:jeeRegNo/:name', getDocs);
router.get('/form3/:regNo', verifyAdminToken, getForm3);
router.get('/form1/:regNo', verifyAdminToken, getForm1);
router.post('/verifyToken', verifyAdminToken, (req, res) => {
  res.status(200).json({
    auth: true
  })
})

module.exports = router;