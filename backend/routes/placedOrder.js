const express = require('express');
const { createOrder } = require('../controllers/placedOrderCon');
const router = express.Router();

// Route to create an order
router.post('/create', createOrder);

module.exports = router;
