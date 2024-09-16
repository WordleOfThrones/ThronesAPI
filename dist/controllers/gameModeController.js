"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGameMode = exports.getGameById = exports.getAllGames = exports.createGame = void 0;
const prismaClient_1 = require("../utils/prismaClient");
const createGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, attempts, time, dailyScore } = req.body;
    try {
        const newGame = yield prismaClient_1.prisma.jogos.create({
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
    }
    catch (error) {
        console.error('Erro ao criar jogo:', error);
        res.status(500).json({ message: 'Erro ao criar jogo', error });
    }
});
exports.createGame = createGame;
const getAllGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield prismaClient_1.prisma.jogos.findMany();
        res.status(200).json(games);
    }
    catch (error) {
        console.error('Erro ao listar jogos:', error);
        res.status(500).json({ message: 'Erro ao listar jogos', error });
    }
});
exports.getAllGames = getAllGames;
const getGameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const game = yield prismaClient_1.prisma.jogos.findUnique({
            where: { idJogo: Number(id) },
        });
        if (!game) {
            return res.status(404).json({ message: 'Jogo não encontrado' });
        }
        res.status(200).json(game);
    }
    catch (error) {
        console.error('Erro ao obter jogo:', error);
        res.status(500).json({ message: 'Erro ao obter jogo', error });
    }
});
exports.getGameById = getGameById;
const updateGameMode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameModeName } = req.body;
    if (!gameModeName) {
        return res.status(400).json({ message: 'O nome do modo de jogo é obrigatório' });
    }
    try {
        const existingMode = yield prismaClient_1.prisma.modosJogo.findUnique({
            where: { idModo: Number(gameModeName) },
        });
        if (existingMode) {
            return res.status(400).json({ message: 'Modo de jogo já existe' });
        }
        const newGameMode = yield prismaClient_1.prisma.modosJogo.create({
            data: {
                nomeModo: gameModeName,
            },
        });
        return res.status(201).json({
            message: 'Modo de jogo criado com sucesso!',
            mode: newGameMode,
        });
    }
    catch (error) {
        console.error('Erro ao criar modo de jogo:', error);
        return res.status(500).json({ message: 'Erro ao criar modo de jogo' });
    }
});
exports.updateGameMode = updateGameMode;
