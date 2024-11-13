const adminrest = require("../models/adminrest");
const bcrypt = require('bcryptjs')

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
    const { id, oldpassword, newpassword } = req.body;

  // Check if all required fields are present
  if (!id || !oldpassword || !newpassword) {
    return res.status(400).json({ success: false, message: 'Missing required fields: id, oldpassword, and newpassword must be provided.' });
  }

  // Proceed with password update logic
  try {
    // Your password update logic here (e.g., find user by id and update password)
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if the old password matches
    const isOldPasswordCorrect = await bcrypt.compare(oldpassword, user.password);
    if (!isOldPasswordCorrect) {
      return res.status(400).json({ success: false, message: 'Old password is incorrect' });
    }

    // Hash new password and save it
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};



const resetpasswordcontroller = async(req,res) => {
    try{
        const {email, newpassword, firstname} = req.body
        if(!email || !newpassword || !firstname){
            return res.status(500).send({
                success : false,
                message : 'please privide all fields',
            })
        }
        const admin = await adminrest.findOne({email,firstname})
        if(!admin){
            return res.status(500).send({
                success : false,
                message : 'admin not found or invladi firstname',
            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedpassword = await (bcrypt.hash(newpassword, salt))
        admin.password = hashedpassword
        await admin.save()
        res.status(200).send({
            success : true,
            message : 'password reset successfully'
        })
    }
    catch(error)
    {
        res.status(500).send({
            success : false,
            message : 'error in password reset api',
            error
        })
    }

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

module.exports = {getadmineditcontroller, updateadmincontroller, updataadminpasswordcontroller,resetpasswordcontroller,deleteadminprofilecontroller};