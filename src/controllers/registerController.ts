import { prisma } from '../utils/prismaClient';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
  const { nameUser, nickname, email, password } = req.body;

  if (!nameUser || !nickname || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const existingUser = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.usuarios.create({
      data: {
        nameUser,
        nickname,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      user: { id: newUser.userId, nameUser: newUser.nameUser, email: newUser.email },
    });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
  }
};
