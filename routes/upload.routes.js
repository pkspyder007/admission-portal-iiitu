
const path = require('path');
const express = require('express');
const multer = require('multer');
const { access, mkdirSync } = require('fs');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        const userPath = path.join(__dirname, "../", "uploads", req.userId);
        console.log(userPath);
        access(userPath, (err) => {
            if (err) {
                mkdirSync(userPath, { recursive: true });
                cb(null, userPath)
            } else {
                cb(null, userPath)
            }
        });
        // cb(null, "reg"))
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        let fileName = `${req.headers['filename']}${getExtension(file.originalname)}`
        cb(null, req.userId + '-' + fileName);
    }
});

var upload = multer({ storage: storage })


// Upload Image
router.post("/upload", verifyToken, upload.single('doc'), (req, res) => {
    console.log(req.headers['filename']);
    return res.json({
        image: req.file.path
    });
});

module.exports = router;