import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

const calculateScore = (tentativas: number, tempo: number): number => {
  const baseScore = 100;
  const penaltyTentativas = tentativas * 10;
  const penaltyTempo = Math.floor(tempo / 60) * 5;

  let score = baseScore - penaltyTentativas - penaltyTempo;
  return score < 0 ? 0 : score;
};

export const createGame = async (req: Request, res: Response) => {
  const { idUser, idModoJogo, personagemAleatorio } = req.body;

  try {
    const newGame = await prisma.jogos.create({
      data: {
        idUser: Number(idUser),
        qtdTentativas: 0,
        tempo: 0,
        status: 0,
        pontuacaoDia: 0,
        data: new Date(),
      },
    });

    await prisma.datas.create({
      data: {
        idJogo: newGame.idJogo,
        idModoJogo: Number(idModoJogo),
        idPersonagem: personagemAleatorio?.idPersonagem || null,
        data: new Date(),
      },
    });

    return res.status(201).json({
      message: 'Jogo iniciado com sucesso!',
      game: newGame,
    });
  } catch (error) {
    console.error('Erro ao iniciar jogo:', error);
    return res.status(500).json({ message: 'Erro ao iniciar jogo', error });
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const game = await prisma.jogos.findUnique({
      where: { idJogo: Number(id) },
    });

    if (!game) {
      return res.status(404).json({ message: 'Jogo não encontrado' });
    }

    await prisma.jogos.delete({
      where: { idJogo: Number(id) },
    });

    return res.status(200).json({ message: 'Jogo deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar jogo:', error);
    return res.status(500).json({ message: 'Erro ao deletar jogo', error });
  }
};
