const jwt = require('jsonwebtoken')

module.exports = async(req,res,next) => {
    try{
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token, process.env.jwt_secret,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    success : false,
                    message : 'Un-authorize admin'
                })
            }else{
                req.body.id = decode.id;
                next();
            }
        })
    }
    catch (error){
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'please provide admin token',
            error
        })
        
    }
}