
const express = require('express');
const { getadmineditcontroller, updateadmincontroller, resetpasswordcontroller, updataadminpasswordcontroller, deleteadminprofilecontroller, sendOtpController, verifyOtpController, resetPassword } = require('../controllers/admineditcontroller');
const adminmiddleware = require('../middlewares/adminmiddleware');

const router = express.Router();

router.get('/getadmin', adminmiddleware,getadmineditcontroller)

router.put('/updateadmin', adminmiddleware,updateadmincontroller)

router.post('/updatepassword', adminmiddleware,updataadminpasswordcontroller)

router.post('/resetpassword', resetpasswordcontroller);

router.delete('/deleteadmin/:id',adminmiddleware, deleteadminprofilecontroller);

router.post('/get-otp', sendOtpController); // Endpoint to request OTP

router.post("/verify-otp", verifyOtpController); 

router.post('/reset-password', resetPassword);


module.exports = router;
