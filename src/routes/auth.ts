import express from 'express';
import { loginUser } from '../controllers/loginController';
import { registerUser } from '../controllers/registerController';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

export default router;
