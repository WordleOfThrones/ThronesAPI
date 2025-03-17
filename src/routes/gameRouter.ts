import express from "express";
import { createOrUpdateGame, getUserScoreByDate } from "../controllers/gameController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/game/", createOrUpdateGame);
router.get("/game/:idUser/score", authenticateToken, getUserScoreByDate);

export default router;