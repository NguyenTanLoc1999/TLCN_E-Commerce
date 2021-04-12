const express = require('express');
const { addCategory, getCategories, updateCategories } = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});

const upload = multer({storage});

router.post('/category/create',requireSignin,adminMiddleware,upload.single('category'),addCategory);
router.get('/category/getcategory', getCategories);
router.post('/category/create',upload.array('categoryImage'),updateCategories);

module.exports = router;