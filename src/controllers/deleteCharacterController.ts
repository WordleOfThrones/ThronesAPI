import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

export const deleteCharacter = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const character = await prisma.personagens.findUnique({
            where: { idPersonagem: Number(id) },
        });

        if (!character) {
            return res.status(404).json({ message: 'Personagem não encontrado' });
        }

        await prisma.personagens.delete({
            where: { idPersonagem: Number(id) },
        });

        return res.status(200).json({ message: 'Personagem deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar personagem:', error);
        return res.status(500).json({ message: 'Erro ao deletar personagem' });
    }
};