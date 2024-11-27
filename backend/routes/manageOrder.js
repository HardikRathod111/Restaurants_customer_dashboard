
const express = require('express');
const adminmiddleware = require('../middlewares/adminmiddleware');
const { addItem } = require('../controllers/manageOrderCon');
const upload = require('../middlewares/Multermiddleware'); // Multer middleware


const router = express.Router();

router.post('/add',upload.single('image'), addItem);


module.exports = router;
