import express from 'express';
import { updateUser } from '../controllers/updateUserController';
import { getAllUsers } from '../controllers/userController';

const router = express.Router();

router.put('/user/update/:id', updateUser); 
router.get('/users', getAllUsers);

export default router;
