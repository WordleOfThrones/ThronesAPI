import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

export const createGame = async (req: Request, res: Response) => {
  const { idUser, attempts, time, dailyScore } = req.body;

  try {
    const newGame = await prisma.jogos.create({
      data: {
        idUser: Number(idUser),
        qtdTentativas: attempts || 0,
        tempo: time || 0,
        status: 0,
        pontuacaoDia: dailyScore || 0,
        data: new Date(),
      },
    });

    res.status(201).json({
      message: 'Jogo criado com sucesso!',
      game: newGame,
    });
  } catch (error) {
    console.error('Erro ao criar jogo:', error);
    res.status(500).json({ message: 'Erro ao criar jogo', error });
  }
};

export const getAllGames = async (req: Request, res: Response) => {
  try {
    const games = await prisma.jogos.findMany();
    res.status(200).json(games);
  } catch (error) {
    console.error('Erro ao listar jogos:', error);
    res.status(500).json({ message: 'Erro ao listar jogos', error });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const game = await prisma.jogos.findUnique({
      where: { idJogo: Number(id) },
    });

    if (!game) {
      return res.status(404).json({ message: 'Jogo não encontrado' });
    }

    res.status(200).json(game);
  } catch (error) {
    console.error('Erro ao obter jogo:', error);
    res.status(500).json({ message: 'Erro ao obter jogo', error });
  }
};

export const updateGameMode = async (req: Request, res: Response) => {
  const { gameModeName } = req.body;

  if (!gameModeName) {
    return res.status(400).json({ message: 'O nome do modo de jogo é obrigatório' });
  }

  try {
    const existingMode = await prisma.modosJogo.findUnique({
      where: { idModo: Number(gameModeName) },
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