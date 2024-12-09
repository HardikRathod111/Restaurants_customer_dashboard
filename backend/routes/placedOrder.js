const express = require('express');
const { createOrder , getAllOrders , acceptOrder , deliverOrder } = require('../controllers/placedOrderCon');
const router = express.Router();

// Route to create an order
router.post('/create', createOrder);

router.get('/getPlacedOrder', getAllOrders);

router.patch('/accept-order/:orderId', acceptOrder);

router.patch('/deliverd/:orderId', deliverOrder);

module.exports = router;