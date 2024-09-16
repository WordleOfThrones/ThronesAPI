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
exports.inserirRegistrosDiarios = void 0;
const prismaClient_1 = require("../utils/prismaClient");
const personagemFoiSorteadoRecentemente = (idPersonagem, idModoJogo) => __awaiter(void 0, void 0, void 0, function* () {
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
    const sorteioRecente = yield prismaClient_1.prisma.datas.findFirst({
        where: {
            idPersonagem,
            idModoJogo,
            data: {
                gte: trintaDiasAtras,
            },
        },
    });
    return sorteioRecente !== null;
});
const inserirRegistrosDiarios = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modosJogo = yield prismaClient_1.prisma.modosJogo.findMany({
            select: {
                idModo: true,
            },
        });
        const personagens = yield prismaClient_1.prisma.personagens.findMany({
            select: {
                idPersonagem: true,
            },
        });
        if (personagens.length === 0 || modosJogo.length === 0) {
            console.error('Nenhum personagem ou modo de jogo encontrado.');
            return;
        }
        for (const modo of modosJogo) {
            let personagemAleatorio;
            let tentativa = 0;
            let personagemSorteado = false;
            while (!personagemSorteado && tentativa < 10) {
                const randomIndex = Math.floor(Math.random() * personagens.length);
                personagemAleatorio = personagens[randomIndex];
                const foiSorteado = yield personagemFoiSorteadoRecentemente(personagemAleatorio.idPersonagem, modo.idModo);
                if (!foiSorteado) {
                    personagemSorteado = true;
                }
                else {
                    tentativa++;
                }
            }
            if (!personagemAleatorio) {
                console.error('Nenhum personagem foi sorteado corretamente.');
                return;
            }
            const novoJogo = yield prismaClient_1.prisma.jogos.create({
                data: {
                    idUser: 1,
                    qtdTentativas: 0,
                    tempo: 0,
                    status: 0,
                    pontuacaoDia: 0,
                    data: new Date(),
                },
            });
            yield prismaClient_1.prisma.datas.create({
                data: {
                    idPersonagem: personagemAleatorio.idPersonagem,
                    idModoJogo: modo.idModo,
                    idJogo: novoJogo.idJogo,
                    data: new Date(),
                },
            });
            console.log(`Personagem ${personagemAleatorio.idPersonagem} sorteado para o Modo ${modo.idModo}`);
        }
        console.log('Registros diários inseridos com sucesso!');
    }
    catch (error) {
        console.error('Erro ao inserir registros diários:', error);
    }
});
exports.inserirRegistrosDiarios = inserirRegistrosDiarios;
