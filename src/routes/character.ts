import express from 'express';
import {
  getCharacterById, getCharacterByName, uploadCharacter, deleteCharacter, updateCharacter, getAllCharacters, getSortedCharacter} from '../controllers/characterController';
import { prisma } from '../utils/prismaClient';

const router = express.Router();

router.get('/character/:id', getCharacterById);
router.get('/character', getCharacterByName);
router.get('/character-all/', getAllCharacters);
router.post('/character', uploadCharacter);
router.delete('/character/:id', deleteCharacter);
router.put('/character/:id', updateCharacter);
router.get('/character/sorted-character/:id', getSortedCharacter);

export default router;