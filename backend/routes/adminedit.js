const express = require('express');
<<<<<<< HEAD
const { getadmineditcontroller, updateadmincontroller, resetpasswordcontroller, updataadminpasswordcontroller, deleteadminprofilecontroller, sendOtpController, verifyOtpController, resetPassword } = require('../controllers/admineditcontroller');
=======
const { getadmineditcontroller, updateadmincontroller, resetpasswordcontroller, updataadminpasswordcontroller, deleteadminprofilecontroller } = require('../controllers/admineditcontroller');
>>>>>>> a7ff61a57dd5ec835b3edeb4182ab3bd2061376b
const adminmiddleware = require('../middlewares/adminmiddleware');

const router = express.Router();

router.get('/getadmin', adminmiddleware,getadmineditcontroller)

router.put('/updateadmin', adminmiddleware,updateadmincontroller)

router.post('/updatepassword', adminmiddleware,updataadminpasswordcontroller)

router.post('/resetpassword', resetpasswordcontroller);

<<<<<<< HEAD
router.delete('/deleteadmin/:id',adminmiddleware, deleteadminprofilecontroller);

router.post('/get-otp', sendOtpController); // Endpoint to request OTP

router.post("/verify-otp", verifyOtpController); 

router.post('/reset-password', resetPassword);

=======
router.delete('/deleteadmin/:id',adminmiddleware, deleteadminprofilecontroller)
>>>>>>> a7ff61a57dd5ec835b3edeb4182ab3bd2061376b

module.exports = router;