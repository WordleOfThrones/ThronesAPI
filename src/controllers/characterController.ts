import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

/* 
export const addCharacter = async (req: Request, res: Response) => {
    const {
        nome,
        descricao,
        casa,
        genero,
        raca,
        titulo,
        origem,
        religiao,
        serie,
        primeiraAparicao,
        imagem,
        imagemAdvinhacao
    } = req.body;

    try {
        const newCharacter = await prisma.personagens.create({
            data: {
                nome,
                descricao,
                casa,
                genero,
                raca,
                titulo,
                origem,
                religiao,
                serie,
                primeiraAparicao,
                imagem,
                imagemAdvinhacao
            },
        });

        return res.status(201).json({
            message: 'Personagem criado com sucesso!',
            personagem: newCharacter,
        });
    } catch (error) {
        console.error('Erro ao criar personagem:', error);
        return res.status(500).json({ error: 'Erro ao criar personagem' });
    }
}; 
*/

export const getCharacterById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const character = await prisma.personagens.findUnique({
            where: { idPersonagem: Number(id) },
        });

        if (!character) {
            return res.status(404).json({ message: 'Personagem não encontrado' });
        }

        return res.status(200).json(character);
    } catch (error) {
        console.error('Erro ao buscar personagem:', error);
        return res.status(500).json({ error: 'Erro ao buscar personagem' });
    }
};