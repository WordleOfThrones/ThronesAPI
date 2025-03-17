import express from "express";
import { createOrUpdateGame } from "../controllers/gameController";

const router = express.Router();

router.post("/", createOrUpdateGame);

export default router;