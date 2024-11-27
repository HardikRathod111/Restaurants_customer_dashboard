const express = require('express');
const {userSignup} = require('../controllers/CustomerCon');
const router = express.Router();

router.post('/userSignup', userSignup);

module.exports = router;