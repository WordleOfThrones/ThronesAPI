import express from 'express';
import { addCharacter } from '../controllers/characterController';

const router = express.Router();

router.post('/character/insert', addCharacter);


export default router;
