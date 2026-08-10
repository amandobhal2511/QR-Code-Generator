import QRCode from 'qrcode';
import crypto from "crypto";
import { eq } from "drizzle-orm";

import db from "../db/drizzle.js";
import { qrCodes } from "../models/schema.js";

export async function postData(req, res) {

    const data = req.body;

    // Validation
    if (!data.content || data.content.trim() === "") {
        return res.status(400).json({
            message: "Please Enter some text or URL"
        });
    }

    const content = data.content.trim();

    // Generate hash
    const contentHash = crypto
        .createHash("sha256")
        .update(content)
        .digest("hex");

    // Check whether this content already exists
    const existingQR = await db
        .select()
        .from(qrCodes)
        .where(eq(qrCodes.contentHash, contentHash))
        .limit(1);

    // If already exists, return stored QR
    if (existingQR.length > 0) {

        return res.status(200).json({
            message: "QR Already Exists",
            qrcode: existingQR[0].qrImage
        });
    }

    // Generate new QR
    const qrImage = await QRCode.toDataURL(content);

    // Save new QR in database
    await db.insert(qrCodes).values({
        content: content,
        contentHash: contentHash,
        qrImage: qrImage
    });

    // Return newly generated QR
    return res.status(201).json({
        message: "QR Generated Successfully",
        qrcode: qrImage
    });
}