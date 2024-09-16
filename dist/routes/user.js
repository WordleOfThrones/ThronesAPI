"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.put('/user/update/:id', authMiddleware_1.authenticateToken, userController_1.updateUser);
router.get('/users', authMiddleware_1.authenticateToken, userController_1.getAllUsers);
router.get('/users/:id', authMiddleware_1.authenticateToken, userController_1.getUserById);
router.post('/user/register', userController_1.registerUser);
router.post('/user/login', userController_1.loginUser);
exports.default = router;
