const express = require('express');
const { loginStudent, form3DataInput, form1DataInput } = require('../controllers/student.controller');
const router = express.Router();
const verifyToken = require('../middlewares/auth');

router.post('/login', loginStudent);
router.post('/form3', verifyToken, form3DataInput);
router.post('/form1', verifyToken, form1DataInput);
// router.post('/', test)

module.exports = router; 