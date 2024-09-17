import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

export const createGameMode = async (req: Request, res: Response) => {
  const { gameModeName } = req.body;

  if (!gameModeName) {
    return res.status(400).json({ message: 'O nome do modo de jogo é obrigatório' });
  }

  try {
    const existingMode = await prisma.modosJogo.findUnique({
      where: { nomeModo: gameModeName },
    });

    if (existingMode) {
      return res.status(400).json({ message: 'Modo de jogo já existe' });
    }

    const newGameMode = await prisma.modosJogo.create({
      data: {
        nomeModo: gameModeName,
      },
    });

    return res.status(201).json({
      message: 'Modo de jogo criado com sucesso!',
      mode: newGameMode,
    });
  } catch (error) {
    console.error('Erro ao criar modo de jogo:', error);
    return res.status(500).json({ message: 'Erro ao criar modo de jogo' });
  }
};

export const updateGameMode = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { gameModeName } = req.body;

  if (!gameModeName) {
    return res.status(400).json({ message: 'O nome do modo de jogo é obrigatório' });
  }

  try {
    const existingMode = await prisma.modosJogo.findUnique({
      where: { idModo: Number(id) },
    });

    if (!existingMode) {
      return res.status(404).json({ message: 'Modo de jogo não encontrado' });
    }

    const updatedMode = await prisma.modosJogo.update({
      where: { idModo: Number(id) },
      data: { nomeModo: gameModeName },
    });

    return res.status(200).json({
      message: 'Modo de jogo atualizado com sucesso!',
      mode: updatedMode,
    });
  } catch (error) {
    console.error('Erro ao atualizar modo de jogo:', error);
    return res.status(500).json({ message: 'Erro ao atualizar modo de jogo' });
  }
};

export const deleteGameMode = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingMode = await prisma.modosJogo.findUnique({
      where: { idModo: Number(id) },
    });

    if (!existingMode) {
      return res.status(404).json({ message: 'Modo de jogo não encontrado' });
    }

    await prisma.modosJogo.delete({
      where: { idModo: Number(id) },
    });

    return res.status(200).json({ message: 'Modo de jogo deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar modo de jogo:', error);
    return res.status(500).json({ message: 'Erro ao deletar modo de jogo' });
  }
};
