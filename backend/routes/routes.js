import express from 'express';
import { postData } from '../controllers/controller.js';

const router = express.Router();

router.post('/generateQR' , postData );

export default router;