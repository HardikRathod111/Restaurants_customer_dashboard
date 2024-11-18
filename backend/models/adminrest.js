const mongoose = require('mongoose');

const adminrestSchema = new mongoose.Schema(
    {
        firstname:{
            type: String,
            require: [true, "firstname is required"],
        },
        lastname:{
            type: String,
            require: [true, "lastname is required"],
        },
        email:{
            type: String,
            require: [true, "email is required"],
        },
        phonenumber:{
            type: String,
            require: [true, "phonenumber is required"],
        },
        country:{
            type: String,
            require: [true, "country is required"],
        },
        state:{
            type: String,
            require: [true, "state is required"],
        },
        city:{
            type: String,
            require: [true, "city is required"],
        },
        selectrestaurant:{
            type: String,
            require: [true, "selectrestaurant is required"],
        },
        password:{
            type: String,
            require: [true, "password is required"],
        },
        comfirmpassword:{
            type: String,
            require: [true, "comfirmpassword is required"],
        },
<<<<<<< HEAD
        resetOtp:{
            type: String,
        },
        otpExpires: {
            type: Number, // Timestamp for OTP expiration
        },
=======
>>>>>>> a7ff61a57dd5ec835b3edeb4182ab3bd2061376b

    },{timestamps:true}
)

module.exports = mongoose.model('adminres',adminrestSchema);