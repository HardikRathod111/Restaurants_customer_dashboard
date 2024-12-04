

const adminrest = require("../models/adminrest");

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const admincontroller = async(req,res)=>{
    try{
        const {firstname, lastname, email, phonenumber, country, state, city, selectrestaurant, password, comfirmpassword } = req.body

        if(!firstname || !lastname || !email || !phonenumber || !country || !state || !city || !selectrestaurant || !password || !comfirmpassword){
            return res.status(500).send({
                success: false,
                message : 'please provide all fields'
            })
        }
        const exisitingadmin = await (adminrest.findOne({email}))
        if(exisitingadmin){
            return res.status(500).send({
                success:false,
                message:'email already registerd please login'
            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedpassword = await (bcrypt.hash(password, salt))
        const adminuser = await( adminrest.create({firstname, lastname, email, phonenumber, country, state, city, selectrestaurant, password : hashedpassword, comfirmpassword}))
        res.status(201).send({
            success : true,
            message : 'successfully admin registered'
        })

    }catch(error){
        console.log("error in admincontroller register api", error);
        res.status(200).send({
            success : true,
            message : "admincontroller register data api",
        })    
        
    }
};


const adminlogin = async (req,res) => {
    try{
        const{email,password } = req.body
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:'please provide email or password'
            })
        }
        const admin = await adminrest.findOne({email})
        if(!admin){
            return res.status(404).send({
                success:false,
                message:'admin is not found'
            })    
        }

        const isMatch = await bcrypt.compare(password, admin.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'invalid credentials'
            });
        }

        const token = jwt.sign({id:admin._id}, process.env.jwt_secret,{
            expiresIn : "1d",
        })


        res.status(200).send({
            success:true,
            message:'login successfully',
            token, 
            admin,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in adminlogin api',
            error
        })
        
    }
};

module.exports = {admincontroller, adminlogin};