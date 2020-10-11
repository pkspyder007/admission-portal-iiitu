const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({msg: 'hello1'})
});

module.exports = router; 