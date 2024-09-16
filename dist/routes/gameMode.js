"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gameModeController_1 = require("../controllers/gameModeController");
const router = express_1.default.Router();
router.post('/game-mode', gameModeController_1.updateGameMode);
exports.default = router;
