const express = require('express');
const adminmiddleware = require('../middlewares/adminmiddleware');
<<<<<<< HEAD
const { addItem } = require('../controllers/manageOrderCon');
const upload = require('../middlewares/Multermiddleware'); // Multer middleware


const router = express.Router();

router.post('/add',upload.single('image'), addItem);

=======
const { createitemcontroller, getallitemscontroller, getsingleitemscontroller, updataitemscontroller, deleteitemscontroller } = require('../controllers/manageOrderCon');

const router = express.Router();

router.post('/crete', adminmiddleware,createitemcontroller)
router.get('/getall',adminmiddleware,getallitemscontroller)
router.get('/get/:id',adminmiddleware,getsingleitemscontroller)

router.put('/update/:id',adminmiddleware,updataitemscontroller)
router.delete('/delete/:id',adminmiddleware,deleteitemscontroller)
>>>>>>> f67d06d35eb50586b28fc9bc855ec648655fbfa4

module.exports = router;