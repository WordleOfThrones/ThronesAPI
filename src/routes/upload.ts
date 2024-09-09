import express from 'express';
import { uploadImage } from '../controllers/uploadController';

const router = express.Router();

router.post('/upload-image', uploadImage);

export default router;
