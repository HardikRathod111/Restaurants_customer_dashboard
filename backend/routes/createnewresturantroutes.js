const express = require('express');
const { createnewresturantcontroller, getRestaurant } = require('../controllers/createnewresturantcontrollers');

const router = express.Router();

// POST: Create a new restaurant
router.post('/create', createnewresturantcontroller);

router.get('/getRestaurant', getRestaurant);

module.exports = router;
