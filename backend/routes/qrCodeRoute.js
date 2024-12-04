const express = require('express');
const { CreateQrCode, getAllQrCodes , updateQrCode , deleteQrCode} = require('../controllers/qrCodeController');
const router = express.Router();

router.post('/createQrCode', CreateQrCode);

router.get('/getAllQrCodes', getAllQrCodes);

router.put('/updateQrCode/:id', updateQrCode);

router.delete('/deleteQrCode/:id', deleteQrCode);


module.exports = router;