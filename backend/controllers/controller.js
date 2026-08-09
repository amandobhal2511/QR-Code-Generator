import QRcode from 'qrcode';

export async function postData(req , res){
    
    const data = req.body;

    if (!data.content || data.content.trim() === "") {
        return res.status(400).json({
            message: "Please enter some text or URL"
        });
    }

    console.log(`User sent this data to convert into QRCode : ${data.content}`);

    const qrcode = await QRcode.toDataURL(data.content);


    return res.status(201).json({
        "message":"QR Generated Successfully",
        "qrcode": qrcode
    });

}