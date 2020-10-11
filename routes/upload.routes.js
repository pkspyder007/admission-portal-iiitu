
const path = require('path');
const express = require('express');
const multer  = require('multer');
const { access, mkdirSync } = require('fs');
const router = express.Router();

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        const userPath = path.join(__dirname, "../", "uploads", req.userId);
        console.log(userPath);
        access(userPath, (err) => {
            if(err) {
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
        cb(null, req.userId + '-' + file.originalname);
    }
});

var upload = multer({storage: storage})


// Upload Image
router.post("/upload", upload.single('doc'), (req, res) => {
    console.log(5);
    return res.json({
        image: req.file.path
    });
});

module.exports = router;