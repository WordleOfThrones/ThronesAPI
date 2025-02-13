import express from 'express';
import { personagemFoiSorteadoRecentemente } from '../services/dataService';
import { prisma } from '../utils/prismaClient';

const router = express.Router();

router.get('/test/sorteio', async (req, res) => {
    try {
        console.log("🔍 Teste de sorteio iniciado no servidor Render...");

        // Seleciona um modo de jogo aleatório (ou você pode definir um fixo)
        const modoJogo = await prisma.modosJogo.findFirst();
        if (!modoJogo) {
            return res.status(404).json({ message: "Nenhum modo de jogo encontrado." });
        }

        console.log(`🎮 Modo de Jogo Selecionado: ${modoJogo.nomeModo}`);

        // Seleciona um personagem aleatório
        const personagens = await prisma.personagens.findMany();
        if (!personagens.length) {
            return res.status(404).json({ message: "Nenhum personagem disponível." });
        }

        const personagemAleatorio = personagens[Math.floor(Math.random() * personagens.length)];

        console.log(`🎲 Personagem sorteado: ${personagemAleatorio.nome}`);

        // Verifica se já foi sorteado recentemente
        const foiSorteado = await personagemFoiSorteadoRecentemente(personagemAleatorio.idPersonagem, modoJogo.idModo);

        console.log(`✅ Personagem ${personagemAleatorio.nome} já foi sorteado recentemente? ${foiSorteado}`);

        return res.json({
            personagem: personagemAleatorio.nome,
            foiSorteadoRecentemente: foiSorteado,
            modoJogo: modoJogo.nomeModo
        });
    } catch (error) {
        console.error("❌ Erro ao testar sorteio:", error);
        return res.status(500).json({ error: "Erro ao testar sorteio." });
    }
});

export default router;