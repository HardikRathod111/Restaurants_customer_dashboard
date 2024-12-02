const express = require('express');
const adminmiddleware = require('../middlewares/adminmiddleware');
const { addItem, getAllItemCon, getItem , updateItemsController , deleteItemsController} = require('../controllers/manageOrderCon');
const upload = require('../middlewares/Multermiddleware'); // Multer middleware

const router = express.Router();

router.post('/add',upload.single('image'), addItem);

router.get('/getAllItems', getAllItemCon);

router.get('/items/:id', getItem)

router.put('/editItem/:id',upload.single('image'), updateItemsController)

router.delete('/deleteItem/:id' , deleteItemsController);


module.exports = router;