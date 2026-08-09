import QRcode from 'qrcode';

export async function postData(req , res){
    
    const data = req.body;

    console.log(`User sent this data to convert into QRCode : ${data.content}`);

    const qrcode = await QRcode.toDataURL(data.content);


    res.status(201).json({
        "message":"QR Generated Successfully",
        "qrcode": qrcode
    });

}