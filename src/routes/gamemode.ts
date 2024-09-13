import express from 'express';
import { updateGameMode } from '../controllers/updateGameModeController';

const router = express.Router();

router.post('/game-mode', updateGameMode);

export default router;