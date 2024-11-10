const express = require('express');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware')
const customerController = require('../controllers/customerController')

router.get('/signup',(req,res)=>{
    res.render('signup');
})
router.get('/signin',(req,res)=>{
    res.render('signin');
})

router.get('/',requireAuth,customerController.Dashboard)

router.post('/api/signup', restaurantController.SignUp );
router.post('/api/signin',restaurantController.SignIn);
router.post('/api/log-out',restaurantController.LogOut)


module.exports = router;