import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

export const createGame = async (req: Request, res: Response) => {
	const { idUser, idModoJogo } = req.body;

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
					idPersonagem: null,
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

export const updateGame = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { qtdTentativas, tempo } = req.body;

	try {
			const game = await prisma.jogos.findUnique({
				where: { idJogo: Number(id) },
			});

			if (!game) {
				return res.status(404).json({ message: 'Jogo não encontrado' });
			}

			const pontuacao = calculateScore(qtdTentativas, tempo);

			const updatedGame = await prisma.jogos.update({
				where: { idJogo: Number(id) },
				data: {
					qtdTentativas: qtdTentativas || game.qtdTentativas,
					tempo: tempo || game.tempo,
					pontuacaoDia: pontuacao,
					status: 1,
				},
			});

		return res.status(200).json({
			message: 'Jogo atualizado com sucesso!',
			game: updatedGame,
		});
	} catch (error) {
		console.error('Erro ao atualizar jogo:', error);
		return res.status(500).json({ message: 'Erro ao atualizar jogo', error });
	}
};

const calculateScore = (tentativas: number, tempo: number): number => {
	const baseScore = 100;
	const penaltyTentativas = tentativas * 10;
	const penaltyTempo = Math.floor(tempo / 60) * 5;

	let score = baseScore - penaltyTentativas - penaltyTempo;
	return score < 0 ? 0 : score;
};

export const getAllGames = async (req: Request, res: Response) => {
	try {
		const games = await prisma.jogos.findMany();
		return res.status(200).json(games);
	} catch (error) {
		console.error('Erro ao buscar jogos:', error);
		return res.status(500).json({ message: 'Erro ao buscar jogos', error });
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

		return res.status(200).json(game);
	} catch (error) {
		console.error('Erro ao buscar jogo:', error);
		return res.status(500).json({ message: 'Erro ao buscar jogo', error });
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
