import express from 'express';
import { updateGameMode } from '../controllers/gameModeController';

const router = express.Router();

router.post('/game-mode', updateGameMode);

export default router;