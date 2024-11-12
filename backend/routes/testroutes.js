const express = require('express');
const { testusercontroller } = require('../controllers/testcontroller');

const router = express.Router();

router.get('/test-user',testusercontroller);

module.exports = router;