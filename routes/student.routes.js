const express = require('express');
const { loginStudent, form3DataInput, form1DataInput, updateSteps, float, freeze, form1Data } = require('../controllers/student.controller');
const router = express.Router();
const verifyToken = require('../middlewares/auth');

router.post('/login', loginStudent);
router.post('/form3', verifyToken, form3DataInput);
router.post('/form1', verifyToken, form1DataInput);
router.get('/form1', verifyToken, form1Data);
router.post('/float', verifyToken, float);
router.post('/freeze', verifyToken, freeze);
router.post('/updateSteps', verifyToken, updateSteps);
router.post('/verifyToken', verifyToken, (req, res) => {
  res.status(200).json({
    auth: true
  })
})
// router.post('/', test)

module.exports = router; 