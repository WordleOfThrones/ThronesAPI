import { Request, Response } from 'express';
import { bucket } from '../utils/db';
import { prisma } from '../utils/prismaClient';
import { v4 as uuidv4 } from 'uuid';
import multer, { FileFilterCallback } from 'multer';

const upload = multer({ storage: multer.memoryStorage() }).fields([
  { name: 'imagem', maxCount: 1 },
  { name: 'imagemAdvinhacao', maxCount: 1 },
]);

export const uploadCharacter = (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro no upload', error: err });
    }

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const { nome, descricao, casa, genero, raca, titulo, origem, religiao, serie, primeiraAparicao } = req.body;

    if (!files['imagem'] || !files['imagemAdvinhacao']) {
      return res.status(400).json({ message: 'Ambas as imagens são obrigatórias' });
    }

    if (!nome || !descricao || !casa || !genero || !raca || !titulo || !origem || !religiao || !serie || !primeiraAparicao) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
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

      const imagemUrl = await uploadImageToFirebase(files['imagem'][0], 'imagem');
      const imagemAdvinhacaoUrl = await uploadImageToFirebase(files['imagemAdvinhacao'][0], 'imagemAdvinhacao');

      const personagem = await prisma.personagens.create({
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
          imagem: imagemUrl,
          imagemAdvinhacao: imagemAdvinhacaoUrl,
        },
      });

      return res.status(201).json({
        message: 'Personagem adicionado com sucesso!',
        personagem,
      });

    } catch (error) {
      return res.status(500).json({ message: 'Erro ao salvar personagem no banco de dados', error });
    }
  });
};
