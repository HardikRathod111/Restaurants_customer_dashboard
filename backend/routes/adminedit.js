const express = require('express');
const { getadmineditcontroller, updateadmincontroller, resetpasswordcontroller, updataadminpasswordcontroller, deleteadminprofilecontroller } = require('../controllers/admineditcontroller');
const adminmiddleware = require('../middlewares/adminmiddleware');

const router = express.Router();

router.get('/getadmin', adminmiddleware,getadmineditcontroller)

router.put('/updateadmin', adminmiddleware,updateadmincontroller)

router.post('/updatepassword', adminmiddleware,updataadminpasswordcontroller)

router.post('/resetpassword', resetpasswordcontroller);

router.delete('/deleteadmin/:id',adminmiddleware, deleteadminprofilecontroller)

module.exports = router;