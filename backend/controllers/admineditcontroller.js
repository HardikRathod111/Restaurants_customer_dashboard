const adminrest = require("../models/adminrest");
const bcrypt = require('bcryptjs')

const getadmineditcontroller = async(req,res) => {
    try{
        const adminedit = await adminrest.findById({_id:req.body.id})
        if(!adminedit){
            return res.status(404).send({
                success : false,
                message : 'adminedit is not found',
            }) 
        }
        res.status(200).send({
            success : false,
            message : 'adminedit get successfully',
            adminedit
        })
    }
    catch(error){
        res.status(500).send({
            success : false,
            message : 'error in get admin api',
            error
        })
    }

};

const updateadmincontroller = async(req,res) => {
    try{
        const admin = await adminrest.findById({_id: req.body.id})
        if(!admin){
            res.status(404).send({
                success : false,
                message : 'admin not found',
                error
            })
        }

        const {firstname, lastname, email, phonenumber, country, state, city, selectrestaurant} = req.body
        if(firstname) admin.firstname = firstname
        if(lastname) admin.lastname = lastname
        if(email) admin.email = email
        if(phonenumber) admin.phonenumber = phonenumber
        if(country) admin.country = country
        if(state) admin.state = state
        if(city) admin.city = city
        if(selectrestaurant) admin.selectrestaurant = selectrestaurant

        await admin.save()
        res.status(200).send({
            success : true,
            message : 'admin updata successfully',
            error
        })        

    }
    catch (error)
    {
        res.status(500).send({
            success : false,
            message : 'error in update admin api',
            error
        })
    }
};


const updataadminpasswordcontroller = async(req,res) => {
    try{
        const admin = await adminrest.findById({_id:req.body.id})
        if(!admin)
        {
            res.status(404).send({
                success : false,
                message : 'admin not found',
                error
            })
        }
        const {oldpassword, newpassword} = req.body
        if(!oldpassword || !newpassword){
            res.status(500).send({
                success : false,
                message : 'please provide old or new password',
                error
            })
        }
        const isMatch = await bcrypt.compare(oldpassword, admin.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'invalid oldpassword'
            });
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedpassword = await (bcrypt.hash(oldpassword, salt))
        admin.password = hashedpassword
        await admin.save()
        res.status(200).send({
            success : true,
            message : 'password updated!',
        })
        
    }
    catch (error)
    {
        res.status(500).send({
            success : false,
            message : 'error in password update api',
            error
        })
    }
    

}


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