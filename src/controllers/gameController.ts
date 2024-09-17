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
  const { idUser, idModoJogo } = req.body;

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

    return res.status(201).json({
      message: 'Jogo iniciado com sucesso!',
      game: newGame,
      personagem: personagemDoDia.idPersonagem,
    });
  } catch (error) {
    console.error('Erro ao iniciar jogo:', error);
    return res.status(500).json({ message: 'Erro ao iniciar jogo', error });
  }
};
