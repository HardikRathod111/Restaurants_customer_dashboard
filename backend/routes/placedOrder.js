const express = require('express');
const { createOrder , getAllOrders } = require('../controllers/placedOrderCon');
const router = express.Router();

// Route to create an order
router.post('/create', createOrder);

router.get('/getPlacedOrder', getAllOrders);

module.exports = router;
