const express = require('express');
const router = express.Router();
const {loginAdmin} = require("../controllers/admin.controller");
const verifyToken = require('../middlewares/auth');

router.post('/login',loginAdmin);
router.post('/verifyToken', verifyToken, (req, res) => {
    res.status(200).json({
      auth: true
    })
  })

module.exports = router;