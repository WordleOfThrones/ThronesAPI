import express from 'express';
import { updateUser } from '../controllers/updateUserController';
import { getAllUsers, getUserById } from '../controllers/userController';

const router = express.Router();

router.put('/user/update/:id', updateUser); 
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);

export default router;