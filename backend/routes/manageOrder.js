const express = require('express');
const adminmiddleware = require('../middlewares/adminmiddleware');
const { createitemcontroller, getallitemscontroller, getsingleitemscontroller, updataitemscontroller, deleteitemscontroller } = require('../controllers/manageOrderCon');

const router = express.Router();

router.post('/crete', adminmiddleware,createitemcontroller)
router.get('/getall',adminmiddleware,getallitemscontroller)
router.get('/get/:id',adminmiddleware,getsingleitemscontroller)

router.put('/update/:id',adminmiddleware,updataitemscontroller)
router.delete('/delete/:id',adminmiddleware,deleteitemscontroller)

module.exports = router;