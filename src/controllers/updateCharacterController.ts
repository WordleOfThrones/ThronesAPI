import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';

export const updateCharacter = async (req: Request, res: Response) => {
    const { id } = req.params;
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
        const character = await prisma.personagens.findUnique({
            where: { idPersonagem: Number(id) },
        });

        if (!character) {
            return res.status(404).json({ message: 'Personagem não encontrado' });
        }

        const updatedCharacter = await prisma.personagens.update({
            where: { idPersonagem: Number(id) },
            data: {
                nome: nome || character.nome,
                descricao: descricao || character.descricao,
                casa: casa || character.casa,
                genero: genero || character.genero,
                raca: raca || character.raca,
                titulo: titulo || character.titulo,
                origem: origem || character.origem,
                religiao: religiao || character.religiao,
                serie: serie || character.serie,
                primeiraAparicao: primeiraAparicao || character.primeiraAparicao,
                imagem: imagem || character.imagem,
                imagemAdvinhacao: imagemAdvinhacao || character.imagemAdvinhacao
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
