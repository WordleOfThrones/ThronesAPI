import express from 'express';
import { getCharacter } from '../controllers/getCharacterController';
import { uploadCharacter } from '../controllers/uploadCharacterController';
import { deleteCharacter } from '../controllers/deleteCharacterController';
import { updateCharacter } from '../controllers/updateCharacterController';

const router = express.Router();

router.get('/character/:id', getCharacter);
router.post('/character', uploadCharacter);
router.delete('/character/:id', deleteCharacter);
router.put('/character/:id', updateCharacter);

export default router;
