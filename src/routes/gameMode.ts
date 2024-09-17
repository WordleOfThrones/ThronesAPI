import express from 'express';
import { createGameMode, deleteGameMode, updateGameMode } from '../controllers/gameModeController';

const router = express.Router();

router.post('/create', createGameMode);
router.put('/update/:id', updateGameMode);
router.delete('/delete/:id', deleteGameMode);

export default router;
