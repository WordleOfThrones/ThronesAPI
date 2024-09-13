import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

export const updateGameMode = async (req: Request, res: Response) => {
    const { nomeModo } = req.body;

    if (!nomeModo) {
        return res.status(400).json({ message: 'O nome do modo de jogo é obrigatório' });
    }

    try {
        const modoExistente = await prisma.modosJogo.findUnique({
            where: { nomeModo },
        });

        if (modoExistente) {
            return res.status(400).json({ message: 'Modo de jogo já existe' });
        }

        const novoModoJogo = await prisma.modosJogo.create({
            data: {
                nomeModo,
            },
        });

        return res.status(201).json({
            message: 'Modo de jogo criado com sucesso!',
            modo: novoModoJogo,
        });
    } catch (error) {
        console.error('Erro ao criar modo de jogo:', error);
        return res.status(500).json({ message: 'Erro ao criar modo de jogo' });
    }
};
