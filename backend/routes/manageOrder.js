const express = require('express');
const adminmiddleware = require('../middlewares/adminmiddleware');
const { addItem, getAllItemCon } = require('../controllers/manageOrderCon');
const upload = require('../middlewares/Multermiddleware'); // Multer middleware

const router = express.Router();

router.post('/add',upload.single('image'), addItem);

router.get('/getAllItems', getAllItemCon);


module.exports = router;