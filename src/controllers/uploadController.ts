import { Request, Response } from 'express';
import { bucket } from '../utils/db';
import { prisma } from '../utils/prismaClient';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() }).single('file');

export const uploadCharacter = (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro no upload', error: err });
    }

    const file = req.file;
    const { nome, descricao, casa, genero, raca, titulo, origem, religiao, serie, primeiraAparicao } = req.body;

    if (!file) {
      return res.status(400).json({ message: 'Nenhum arquivo encontrado' });
    }

    if (!nome || !descricao || !casa || !genero || !raca || !titulo || !origem || !religiao || !serie || !primeiraAparicao) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
      const newFileName = uuidv4() + '-' + file.originalname;
      const fileUpload = bucket.file(newFileName);

      const blobStream = fileUpload.createWriteStream({
        resumable: false,
        contentType: file.mimetype,
      });

      blobStream.on('error', (error) => {
        return res.status(500).json({ message: 'Erro ao fazer upload do arquivo', error });
      });

      blobStream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${newFileName}`;

        try {
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
              imagem: publicUrl,
            },
          });

          return res.status(201).json({
            message: 'Personagem adicionado com sucesso!',
            personagem,
          });

        } catch (dbError) {
          return res.status(500).json({ message: 'Erro ao salvar personagem no banco de dados', error: dbError });
        }
      });

      blobStream.end(file.buffer);

    } catch (error) {
      return res.status(500).json({ message: 'Erro ao fazer upload', error });
    }
  });
};
