"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const characterController_1 = require("../controllers/characterController");
const router = express_1.default.Router();
router.get('/character/:id', characterController_1.getCharacter);
router.post('/character', characterController_1.uploadCharacter);
router.delete('/character/:id', characterController_1.deleteCharacter);
router.put('/character/:id', characterController_1.updateCharacter);
exports.default = router;
