const express = require('express');
const {newCategory , getCategory} = require('../controllers/Category');
const upload = require('../middlewares/Multermiddleware'); // Multer middleware
const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

router.post('/createCategory' ,upload.single('image'), newCategory);

router.get('/getCategory' , getCategory);

module.exports = router;