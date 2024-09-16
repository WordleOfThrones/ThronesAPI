import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';
import { bucket } from '../utils/db';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() }).fields([
  { name: 'image', maxCount: 1 },
  { name: 'guessImage', maxCount: 1 },
]);

const uploadImageToFirebase = (file: Express.Multer.File, folder: string) => {
  return new Promise<string>((resolve, reject) => {
    const newFileName = `${folder}/${uuidv4()}-${file.originalname}`;
    const fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    blobStream.on('error', (error) => reject(error));

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${newFileName}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};

export const uploadCharacter = (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro no upload', error: err });
    }

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

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
    } = req.body;

    if (!files['image'] || !files['guessImage']) {
      return res.status(400).json({ message: 'Ambas as imagens são obrigatórias' });
    }

    if (!name || !description || !house || !gender || !race || !title || !origin || !religion || !series || !firstAppearance) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
      const imageUrl = await uploadImageToFirebase(files['image'][0], 'image');
      const guessImageUrl = await uploadImageToFirebase(files['guessImage'][0], 'guessImage');

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
          imagemAdvinhacao: guessImageUrl,
        },
      });

      return res.status(201).json({
        message: 'Personagem adicionado com sucesso!',
        personagem: character,
      });

    } catch (error) {
      return res.status(500).json({ message: 'Erro ao salvar personagem no banco de dados', error });
    }
  });
};

export const getCharacter = async (req: Request, res: Response) => {
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
  } = req.body;

  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  try {
    const character = await prisma.personagens.findUnique({
      where: { idPersonagem: Number(id) },
    });

    if (!character) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    const imageUrl = files?.['image']
      ? await uploadImageToFirebase(files['image'][0], 'image')
      : character.imagem;
    const guessImageUrl = files?.['guessImage']
      ? await uploadImageToFirebase(files['guessImage'][0], 'guessImage')
      : character.imagemAdvinhacao;

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
        imagem: imageUrl,
        imagemAdvinhacao: guessImageUrl,
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