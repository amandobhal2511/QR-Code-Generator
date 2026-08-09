import express from 'express';
import QRcode from 'qrcode';

const router = express.Router();

router.post('/generateQR' , async(req , res) => {
    
    const data = req.body;

    console.log(`User sent this data to convert into QRCode : ${data.content}`);

    const qrcode = await QRcode.toDataURL(data.content);


    res.status(201).json({
        "message":"QR Generated Successfully",
        "qrcode": qrcode
    });

})

export default router;