import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

export const createOrUpdateGame = async (req: Request, res: Response) => {
    try {
      const { idUser, idModoJogo, qtdTentativas, tempo, status, pontuacao } = req.body;
  
      const dataAtual = new Date();
      dataAtual.setHours(0, 0, 0, 0);
  
      const whereCondition = idUser
        ? { idUser, data: dataAtual, idModoJogo }
        : { idUser: null, data: dataAtual, idModoJogo };
  
      const jogoExistente = await prisma.jogos.findFirst({ where: whereCondition });
  
      if (jogoExistente) {
        const jogoAtualizado = await prisma.jogos.update({
          where: { idJogo: jogoExistente.idJogo },
          data: { qtdTentativas, tempo, status, pontuacao },
        });
  
        return res.status(200).json({
          message: "Jogo atualizado com sucesso!",
          jogo: jogoAtualizado,
        });
      } else {
        const novoJogo = await prisma.jogos.create({
          data: {
            idUser: idUser || null,
            idModoJogo,
            qtdTentativas,
            tempo,
            status,
            pontuacao,
            data: dataAtual,
          },
        });
  
        return res.status(201).json({
          message: "Jogo criado com sucesso!",
          jogo: novoJogo,
        });
      }
    } catch (error) {
      console.error("Erro ao registrar jogo:", error);
      return res.status(500).json({ error: "Erro interno ao criar ou atualizar jogo." });
    }
};