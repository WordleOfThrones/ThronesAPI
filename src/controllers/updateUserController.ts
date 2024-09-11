import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';
import bcrypt from 'bcrypt';

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params; 
    const { nameUser, nickname, email, password } = req.body;

    try {
        const existingUser = await prisma.usuarios.findUnique({
            where: { userId: Number(id) }, 
        });

        if (!existingUser) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        let updatedPassword = existingUser.password;
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.usuarios.update({
            where: { userId: Number(id) },
            data: {
                nameUser: nameUser || existingUser.nameUser,  
                nickname: nickname || existingUser.nickname,
                email: email || existingUser.email,
                password: updatedPassword,
            },
        });

        return res.status(200).json({
            message: 'Usuário atualizado com sucesso!',
            user: {
                id: updatedUser.userId,
                nameUser: updatedUser.nameUser,
                nickname: updatedUser.nickname,
                email: updatedUser.email,
            },
        });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
    }
};
