import express from 'express';
import { createGame, deleteGame } from '../controllers/gameController';

const router = express.Router();

router.post('/create', createGame);
router.delete('/delete/:id', deleteGame);

export default router;
