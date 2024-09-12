import express from 'express';
import { /*addCharacter,*/ getCharacterById } from '../controllers/characterController';

const router = express.Router();

//router.post('/character/insert', addCharacter);
router.get('/character/:id', getCharacterById);

export default router;
