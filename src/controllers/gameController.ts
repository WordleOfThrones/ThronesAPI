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
}

export const getUserScoreByDate = async (req: Request, res: Response) => {
    try {
      const { idUser } = req.params;
      const { data, idModoJogo } = req.query;
  
      if (!idUser || isNaN(Number(idUser))) {
        return res.status(400).json({ error: "O parâmetro idUser deve ser um número válido." });
      };
  
      const dataConsulta = data ? new Date(data as string) : new Date();
      dataConsulta.setHours(0, 0, 0, 0);
  
      const jogosUsuario = await prisma.jogos.findMany({
        where: {
          idUser: Number(idUser),
          data: dataConsulta,
          ...(idModoJogo && { idModoJogo: Number(idModoJogo) })
        },
        include: {
          modoJogo: true,
        },
      });
  
      if (!jogosUsuario || jogosUsuario.length === 0) {
        return res.status(404).json({ error: "Nenhum jogo encontrado para esse usuário nesta data/modo." });
      };
  
      const pontuacaoTotal = jogosUsuario.reduce((total, jogo) => total + Number(jogo.pontuacao), 0);
  
      const pontuacaoPorJogo = jogosUsuario.map((jogo) => ({
        modoJogo: jogo.modoJogo.nomeModo,
        pontuacao: jogo.pontuacao,
        qtdTentativas: jogo.qtdTentativas,
        tempo: jogo.tempo,
        status: jogo.status,
      }));
  
      res.status(200).json({
        data: dataConsulta.toISOString().split('T')[0],
        pontuacaoTotal,
        jogos: pontuacaoPorJogo,
      });
  
    } catch (error) {
      console.error('Erro ao buscar pontuação do usuário:', error);
      res.status(500).json({ error: "Erro ao buscar pontuação do usuário." });
    }
};