import express from "express";
import { createOrUpdateGame, getUserScoreByDate, getJogosRegistrados } from "../controllers/gameController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/game/", createOrUpdateGame);
router.get("/game", getJogosRegistrados);
router.get("/game/:idUser/score", getUserScoreByDate);

export default router;