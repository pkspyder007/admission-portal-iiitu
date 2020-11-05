const express = require('express');
const { loginStudent, form3DataInput, form1DataInput, updateSteps, float, accept, freeze, form1Data, getForm3, register, UpdatePassword } = require('../controllers/student.controller');
const router = express.Router();
const verifyToken = require('../middlewares/auth');

router.post('/login', loginStudent);
router.post('/updatePassword',verifyToken, UpdatePassword);
router.post('/register', register);
router.post('/form3', verifyToken, form3DataInput);
router.get('/form3/:regNo', verifyToken, getForm3);
router.post('/form1', verifyToken, form1DataInput);
router.get('/form1', verifyToken, form1Data);
router.post('/float', verifyToken, float);
router.post('/accept', verifyToken, accept);
router.post('/freeze', verifyToken, freeze);
router.post('/updateSteps', verifyToken, updateSteps);
router.post('/verifyToken', verifyToken, (req, res) => {
  res.status(200).json({
    auth: true
  })
})
// router.post('/', test)

module.exports = router; 