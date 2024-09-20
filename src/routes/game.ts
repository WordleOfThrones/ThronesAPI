import express from 'express';
import { createGame, updateGame } from '../controllers/gameController';

const router = express.Router();

router.post('/create', createGame);
router.put('/update', updateGame);

export default router;
