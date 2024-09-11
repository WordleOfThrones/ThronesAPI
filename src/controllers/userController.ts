import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.usuarios.findMany();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params; // Pega o id da URL

    try {
        const user = await prisma.usuario.findUnique({
            where: { userId: Number(id) },
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
};