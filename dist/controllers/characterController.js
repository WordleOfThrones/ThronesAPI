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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCharacter = exports.updateCharacter = exports.getCharacter = exports.uploadCharacter = void 0;
const prismaClient_1 = require("../utils/prismaClient");
const db_1 = require("../utils/db");
const uuid_1 = require("uuid");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() }).fields([
    { name: 'image', maxCount: 1 },
    { name: 'guessImage', maxCount: 1 },
]);
const uploadImageToFirebase = (file, folder) => {
    return new Promise((resolve, reject) => {
        const newFileName = `${folder}/${(0, uuid_1.v4)()}-${file.originalname}`;
        const fileUpload = db_1.bucket.file(newFileName);
        const blobStream = fileUpload.createWriteStream({
            resumable: false,
            contentType: file.mimetype,
        });
        blobStream.on('error', (error) => reject(error));
        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${db_1.bucket.name}/${newFileName}`;
            resolve(publicUrl);
        });
        blobStream.end(file.buffer);
    });
};
const uploadCharacter = (req, res) => {
    upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(500).json({ message: 'Erro no upload', error: err });
        }
        const files = req.files;
        const { name, description, house, gender, race, title, origin, religion, series, firstAppearance, } = req.body;
        if (!files['image'] || !files['guessImage']) {
            return res.status(400).json({ message: 'Ambas as imagens são obrigatórias' });
        }
        if (!name || !description || !house || !gender || !race || !title || !origin || !religion || !series || !firstAppearance) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }
        try {
            const imageUrl = yield uploadImageToFirebase(files['image'][0], 'image');
            const guessImageUrl = yield uploadImageToFirebase(files['guessImage'][0], 'guessImage');
            const character = yield prismaClient_1.prisma.personagens.create({
                data: {
                    nome: name,
                    descricao: description,
                    casa: house,
                    genero: gender,
                    raca: race,
                    titulo: title,
                    origem: origin,
                    religiao: religion,
                    serie: series,
                    primeiraAparicao: firstAppearance,
                    imagem: imageUrl,
                    imagemAdvinhacao: guessImageUrl,
                },
            });
            return res.status(201).json({
                message: 'Personagem adicionado com sucesso!',
                personagem: character,
            });
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro ao salvar personagem no banco de dados', error });
        }
    }));
};
exports.uploadCharacter = uploadCharacter;
const getCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const character = yield prismaClient_1.prisma.personagens.findUnique({
            where: { idPersonagem: Number(id) },
        });
        if (!character) {
            return res.status(404).json({ message: 'Personagem não encontrado' });
        }
        return res.status(200).json(character);
    }
    catch (error) {
        console.error('Erro ao buscar personagem:', error);
        return res.status(500).json({ error: 'Erro ao buscar personagem' });
    }
});
exports.getCharacter = getCharacter;
const updateCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, house, gender, race, title, origin, religion, series, firstAppearance, } = req.body;
    const files = req.files;
    try {
        const character = yield prismaClient_1.prisma.personagens.findUnique({
            where: { idPersonagem: Number(id) },
        });
        if (!character) {
            return res.status(404).json({ message: 'Personagem não encontrado' });
        }
        const imageUrl = (files === null || files === void 0 ? void 0 : files['image']) ? yield uploadImageToFirebase(files['image'][0], 'image') : character.imagem;
        const guessImageUrl = (files === null || files === void 0 ? void 0 : files['guessImage']) ? yield uploadImageToFirebase(files['guessImage'][0], 'guessImage') : character.imagemAdvinhacao;
        const updatedCharacter = yield prismaClient_1.prisma.personagens.update({
            where: { idPersonagem: Number(id) },
            data: {
                nome: name || character.nome,
                descricao: description || character.descricao,
                casa: house || character.casa,
                genero: gender || character.genero,
                raca: race || character.raca,
                titulo: title || character.titulo,
                origem: origin || character.origem,
                religiao: religion || character.religiao,
                serie: series || character.serie,
                primeiraAparicao: firstAppearance || character.primeiraAparicao,
                imagem: imageUrl,
                imagemAdvinhacao: guessImageUrl,
            },
        });
        return res.status(200).json({
            message: 'Personagem atualizado com sucesso!',
            personagem: updatedCharacter,
        });
    }
    catch (error) {
        console.error('Erro ao atualizar personagem:', error);
        return res.status(500).json({ message: 'Erro ao atualizar personagem' });
    }
});
exports.updateCharacter = updateCharacter;
const deleteCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const character = yield prismaClient_1.prisma.personagens.findUnique({
            where: { idPersonagem: Number(id) },
        });
        if (!character) {
            return res.status(404).json({ message: 'Personagem não encontrado' });
        }
        yield prismaClient_1.prisma.personagens.delete({
            where: { idPersonagem: Number(id) },
        });
        return res.status(200).json({ message: 'Personagem deletado com sucesso' });
    }
    catch (error) {
        console.error('Erro ao deletar personagem:', error);
        return res.status(500).json({ message: 'Erro ao deletar personagem' });
    }
});
exports.deleteCharacter = deleteCharacter;
