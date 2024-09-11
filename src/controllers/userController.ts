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
