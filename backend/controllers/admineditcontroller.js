const adminrest = require("../models/adminrest");
const bcrypt = require('bcryptjs')
const passport = require('passport');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { promisify } = require('util');
const randomBytesAsync = promisify(crypto.randomBytes);
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or your email service
  auth: {
      user: 'harahrathod1432@gmail.com',
<<<<<<< HEAD
      pass: 'jimrawsdgnfdsjsw',
  },
});


const sendOtpController = async (req, res) => {
  const { email } = req.body;

  // Validate the email input
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  try {
    // Find the user by email
    const user = await adminrest.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Generate a secure OTP (6 digits)
    const otp = crypto.randomInt(100000, 999999).toString();

    // Set OTP and its expiration time (e.g., 10 minutes)
    // user.resetOtp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetOtp = otp;
    await user.save();

    // Prepare the email options
    const mailOptions = {
      from: 'harahrathod1432@gmail.com',
      to: user.email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is ${otp}. It is valid for 10 minutes.\n\nIf you did not request this, please ignore this email.`,
    };

    // Send the OTP email
    await transporter.sendMail(mailOptions);

    console.log(`OTP sent to ${user.email}: ${otp}`);

    // Respond to the client
    return res.status(200).json({
      success: true,
      message: 'OTP has been sent to your email address.',
      
    });
  } catch (error) {
    console.error("Error in sendOtpController:", error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP are required." });
  }

  try {
    const user = await adminrest.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (user.resetOtp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }

    // OTP is valid; clear OTP fields
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error in verifyOtpController:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find user by email
    const user = await adminrest.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if the new password is provided
    if (!newPassword) {
      return res.status(400).json({ success: false, message: 'New password is required' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    return res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
=======
      pass: 'nsymdceluqwacark',
  },
});

>>>>>>> a7ff61a57dd5ec835b3edeb4182ab3bd2061376b
const getadmineditcontroller = async (req, res) => {
    try {
        const adminId = req.user.id;  // Assuming `req.user` has the correct decoded token data

        // Perform your database query (replace with actual logic)
        const adminData = await adminrest.findById(adminId);  // Example query, modify as needed

        if (!adminData) {
            return res.status(404).json({ success: false, message: 'Admin data not found' });
        }

        res.status(200).json({ success: true, data: adminData });
    } catch (error) {
        console.error("Error in getadmineditcontroller:", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const updateadmincontroller = async(req,res) => {
    try {
        const adminId = req.user.id; // Assuming `req.user` contains the decoded JWT token data
        const { firstname, lastname, email, phonenumber, selectrestaurant, city, state, country } = req.body; // Destructure updated data from request body
        
        // Update admin data in the database (use your model and validation)
        const updatedAdmin = await adminrest.findByIdAndUpdate(
          adminId,
          { firstname, lastname, email, phonenumber, selectrestaurant, city, state, country },
          { new: true } // This will return the updated document
        );
    
        if (!updatedAdmin) {
          return res.status(404).json({ success: false, message: 'Admin not found' });
        }
    
        res.status(200).json({
          success: true,
          message: 'Admin data updated successfully',
          data: updatedAdmin, // Return updated data
        });
      } catch (error) {
        console.error("Error in updateAdminController:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
};

const updataadminpasswordcontroller = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body; // Match with frontend naming convention

  // Check if all required fields are present
  if (!id || !oldPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Missing required fields: id, oldPassword, and newPassword must be provided.' });
  }

  try {
    // Find user by id
    const user = await adminrest.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify the old password
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordCorrect) {
      return res.status(400).json({ success: false, message: 'Old password is incorrect' });
    }

    // Hash the new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error("Error updating password:", error); // Improved error logging
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};



const resetpasswordcontroller = async(req,res) => {
  const { email } = req.body;
  const user = await adminrest.findOne({ email });
  
  if (!user) {
      return res.render('ForgotPassword', { errors: [{ msg: 'User not found' }] });
  }
   // Generate Reset Token
   const token = (await randomBytesAsync(20)).toString('hex');

   // Set token and expiration (e.g., 1 hour)
   user.resetPasswordToken = token;
   user.resetPasswordExpires = Date.now() + 3600000;
  // Generate OTP (4-6 digits)
  const otp = crypto.randomInt(100000, 999999).toString();

  // Save OTP and expiration (5 minutes)
  user.resetOtp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
  await user.save();

  const resetLink = `http://${req.headers.host}/Change_pass/${token}`;
  // Send OTP to user's email
  const mailOptions = {
      from: 'harahrathod1432@gmail.com',
      to: user.email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is ${otp}`+
              `You are receiving this email because you (or someone else) requested a password reset for your account.\n\n` +
              `Please click the following link, or paste it into your browser to complete the process:\n\n` +
              `${resetLink}\n\n`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      else{
      console.log('OTP sent: ' + info.response);
      }
  });

  console.log(`Generated OTP for ${user.email}: ${otp}`);

  res.redirect(`/Otp_Conf/${user._id}`);
};

const deleteadminprofilecontroller = async(req,res) => {
    try{
        await adminrest.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success : true,
            message : 'your account has been deleted',
        })
    }
    catch (error)
    {
        res.status(500).send({
            success : false,
            message : 'error in delete profile api',
            error
        })
    }
}

<<<<<<< HEAD
module.exports = {getadmineditcontroller,sendOtpController,verifyOtpController,resetPassword, updateadmincontroller, updataadminpasswordcontroller,resetpasswordcontroller,deleteadminprofilecontroller};
=======
module.exports = {getadmineditcontroller, updateadmincontroller, updataadminpasswordcontroller,resetpasswordcontroller,deleteadminprofilecontroller};
>>>>>>> a7ff61a57dd5ec835b3edeb4182ab3bd2061376b
