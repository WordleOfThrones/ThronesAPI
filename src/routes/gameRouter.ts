import express from "express";
import { createOrUpdateGame } from "../controllers/gameController";

const router = express.Router();

router.post("/game/", createOrUpdateGame);

export default router;