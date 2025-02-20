import express from 'express';
import { updateUser, loginUser, getUserById, registerUser, getAllUsers } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.put('/user/:id', authenticateToken, updateUser); 
router.get('/user', authenticateToken, getAllUsers);
router.get('/user/:id', authenticateToken, getUserById);
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

export default router;