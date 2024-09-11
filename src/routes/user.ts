import express from 'express';
import { updateUser } from '../controllers/updateUserController';
import { getAllUsers } from '../controllers/userController'; // Importa o controlador


const router = express.Router();

router.put('user/upade/:id', updateUser);
router.get('/users', getAllUsers);

export default router;
