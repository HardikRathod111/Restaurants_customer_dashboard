const express = require('express');
const { admincontroller, adminlogin } = require('../controllers/admin');

const router = express.Router();

router.post('/admin',admincontroller);
router.post('/adminlogin',adminlogin)

module.exports = router;