import express from 'express';

const router = express.Router();

router.post('/generateQR' , (req , res) => {
    
    const data = req.body;

    res.status(201).json({
        "message":"Data Received Successfully",
        "data": data
    });

})

export default router;