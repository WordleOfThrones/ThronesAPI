import express from 'express';
import {
  getCharacter,
  uploadCharacter,
  deleteCharacter,
  updateCharacter,
  getAllCharacters,
} from '../controllers/characterController';
import { prisma } from '../utils/prismaClient';

const router = express.Router();

router.get('/character/', getCharacter);
router.get('/character/all', getAllCharacters);
router.post('/character', uploadCharacter);
router.delete('/character/:id', deleteCharacter);
router.put('/character/:id', updateCharacter);

router.get('/character/sorted-character', async (req, res) => {
  try {
    const { idModoJogo } = req.query;

    if (!idModoJogo) {
      return res.status(400).json({ error: 'O parâmetro idModoJogo é obrigatório.' });
    }

    const dataAtual = new Date(new Date().setHours(0, 0, 0, 0));
    console.log('Data Atual:', dataAtual);

    const sorteio = await prisma.datas.findFirst({
      where: {
        idModoJogo: Number(idModoJogo),
        data: {
          equals: dataAtual,
        },
      },
      include: {
        personagem: true,
      },
    });

    console.log('Sorteio encontrado:', sorteio);

    if (!sorteio || !sorteio.personagem) {
      return res.status(404).json({ error: 'Nenhum personagem sorteado encontrado para este modo de jogo e data.' });
    }

    const personagemSorteado = {
      nome: sorteio.personagem.nome,
      genero: sorteio.personagem.genero,
      titulo: sorteio.personagem.titulo,
      raca: sorteio.personagem.raca,
      origem: sorteio.personagem.origem,
      religiao: sorteio.personagem.religiao,
      serie: sorteio.personagem.serie,
      primeiraAparicao: sorteio.personagem.primeiraAparicao,
      imagem: sorteio.personagem.imagem,
    };

    res.status(200).json(personagemSorteado);
  } catch (error) {
    console.error('Erro ao buscar personagem sorteado:', error);
    res.status(500).json({ error: 'Erro ao buscar personagem sorteado.' });
  }
});

export default router;