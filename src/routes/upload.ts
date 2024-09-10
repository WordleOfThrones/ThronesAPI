import express from 'express';
import { uploadCharacter } from '../controllers/uploadController';

const router = express.Router();

router.post('/', uploadCharacter);

export default router;
