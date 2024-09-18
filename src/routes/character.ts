import express from 'express';
import { getCharacter, uploadCharacter, deleteCharacter, updateCharacter } from '../controllers/characterController';

const router = express.Router();

router.get('/character/', getCharacter);
router.post('/character', uploadCharacter);
router.delete('/character/:id', deleteCharacter);
router.put('/character/:id', updateCharacter);

export default router;