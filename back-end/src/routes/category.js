const express = require('express');
const { addCategory, getCategories, updateCategories,deleteCategories } = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');
const router = express.Router();

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, path.join(path.dirname(__dirname), 'uploads'))
//     },
//     filename: function (req, file, cb) {
//         cb(null, shortid.generate() + '-' + file.originalname)
//     }
// });

// const upload = multer({storage});

router.post('/category/create',requireSignin,adminMiddleware,addCategory);
router.get('/category/getcategory', getCategories);
router.post('/category/update',updateCategories);
router.post('/category/delete', deleteCategories);

module.exports = router;