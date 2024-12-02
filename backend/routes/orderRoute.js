const express = require('express');
const {createOrder, getOrder,deleteItem} = require('../controllers/orderController');
const router = express.Router();

router.post('/createOrder', createOrder);

router.get('/getOrder/:id', getOrder);

router.delete('/deleteItem/:orderId', deleteItem)

module.exports = router;