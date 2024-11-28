const express = require('express');
const {userSignup , getUser} = require('../controllers/CustomerCon');
const router = express.Router();

router.post('/userSignup', userSignup);

router.get('/getUser', getUser)

module.exports = router;