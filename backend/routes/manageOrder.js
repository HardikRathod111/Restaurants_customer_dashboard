const express = require('express');
const adminmiddleware = require('../middlewares/adminmiddleware');
const { addItem, getAllItemCon, getItem } = require('../controllers/manageOrderCon');
const upload = require('../middlewares/Multermiddleware'); // Multer middleware

const router = express.Router();

router.post('/add',upload.single('image'), addItem);

router.get('/getAllItems', getAllItemCon);

router.get('/items/:id', getItem)


module.exports = router;