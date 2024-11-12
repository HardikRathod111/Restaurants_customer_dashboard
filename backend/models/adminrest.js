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

    },{timestamps:true}
)

module.exports = mongoose.model('adminres',adminrestSchema);