import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

export const uploadCharacter = async (req: Request, res: Response) => {
  try {
    console.log('Request body:', req.body);

    const { name, description, house, gender, race, title, origin, religion, series, firstAppearance, imageUrl } = req.body;

    if (!name || !description || !house || !gender || !race || !title || !origin || !religion || !series || !firstAppearance || !imageUrl) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const character = await prisma.personagens.create({
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
      },
    });

    return res.status(201).json({ message: 'Personagem adicionado com sucesso!', personagem: character });
  } catch (error) {
    console.error('Erro ao salvar personagem no banco de dados:', error);
    return res.status(500).json({ message: 'Erro ao salvar personagem no banco de dados.', error });
  }
};

export const getCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.query;

  try {
    let character;

    if (id) {
      character = await prisma.personagens.findUnique({
        where: { idPersonagem: Number(id) },
      });
    } else if (name) {
      character = await prisma.personagens.findFirst({
        where: { nome: { equals: String(name), mode: 'insensitive' } },
      });
    }

    if (!character) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    return res.status(200).json(character);
  } catch (error) {
    console.error('Erro ao buscar personagem:', error);
    return res.status(500).json({ error: 'Erro ao buscar personagem' });
  }
};

export const getAllCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await prisma.personagens.findMany({
      select: {
        idPersonagem: true,
        nome: true,
        imagem: true,
      },
    });

    if (!characters || characters.length === 0) {
      return res.status(404).json({ message: 'Nenhum personagem encontrado' });
    }

    return res.status(200).json(characters);
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    return res.status(500).json({ error: 'Erro ao buscar personagens' });
  }
};

export const updateCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    description,
    house,
    gender,
    race,
    title,
    origin,
    religion,
    series,
    firstAppearance,
    imageUrl,
  } = req.body;

  try {
    const character = await prisma.personagens.findUnique({
      where: { idPersonagem: Number(id) },
    });

    if (!character) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    const updatedCharacter = await prisma.personagens.update({
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
        imagem: imageUrl || character.imagem,
      },
    });

    return res.status(200).json({
      message: 'Personagem atualizado com sucesso!',
      personagem: updatedCharacter,
    });
  } catch (error) {
    console.error('Erro ao atualizar personagem:', error);
    return res.status(500).json({ message: 'Erro ao atualizar personagem' });
  }
};

export const deleteCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const character = await prisma.personagens.findUnique({
      where: { idPersonagem: Number(id) },
    });

    if (!character) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    await prisma.personagens.delete({
      where: { idPersonagem: Number(id) },
    });

    return res.status(200).json({ message: 'Personagem deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar personagem:', error);
    return res.status(500).json({ message: 'Erro ao deletar personagem' });
  }
};