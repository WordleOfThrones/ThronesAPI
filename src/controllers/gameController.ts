import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

const calculateScore = (tentativas: number, tempo: number): number => {
  const baseScore = 100;
  const penaltyTentativas = tentativas * 10;
  const penaltyTempo = Math.floor(tempo / 60) * 5;

  let score = baseScore - penaltyTentativas - penaltyTempo;
  return score < 0 ? 0 : score;
};

const getOnlyDate = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const createGame = async (req: Request, res: Response) => {
  const { idUser, idModoJogo, tentativas } = req.body;

  try {
    const hoje = getOnlyDate(new Date());

    const personagemDoDia = await prisma.datas.findFirst({
      where: {
        idModoJogo: Number(idModoJogo),
        data: hoje,
      },
    });

    if (!personagemDoDia) {
      return res.status(404).json({ message: 'Personagem do dia não encontrado.' });
    }

    if (tentativas == 1) {
      const newGame = await prisma.jogos.create({
        data: {
          idUser: Number(idUser),
          qtdTentativas: tentativas,
          tempo: 0,
          status: 0,
          pontuacaoDia: 0,
          idModoJogo: Number(idModoJogo),
          data: new Date(),
        },
      });

      return res.status(201).json({
        message: 'Jogo iniciado com sucesso!',
        game: newGame,
        personagem: personagemDoDia.idPersonagem,
      });
    }

  } catch (error) {
    console.error('Erro ao iniciar jogo:', error);
    return res.status(500).json({ message: 'Erro ao iniciar jogo', error });
  }
};

export const updateGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tentativas, tempo, status, idModoJogo } = req.body;

  try {
    const existingGame = await prisma.jogos.findUnique({
      where: { idJogo: Number(id) },
    });

    if (!existingGame) {
      return res.status(404).json({ error: 'Jogo não encontrado.' });
    }

    const score = calculateScore(tentativas, tempo);

    const updatedGame = await prisma.jogos.update({
      where: { idJogo: Number(id) },
      data: {
        qtdTentativas: tentativas,
        tempo: tempo,
        status: status,
        idModoJogo: Number(idModoJogo),
        pontuacaoDia: score,
      },
    });

    return res.status(200).json({
      message: 'Jogo atualizado com sucesso!',
      game: updatedGame,
      score,
    });
  } catch (error) {
    console.error('Erro ao atualizar jogo:', error);
    return res.status(500).json({ message: 'Erro ao atualizar jogo', error });
  }
}
