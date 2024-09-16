import { prisma } from '../utils/prismaClient';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { userId: user.userId, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

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

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nameUser, nickname, email, password } = req.body;

  try {
    const existingUser = await prisma.usuarios.findUnique({
      where: { userId: Number(id) },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    let updatedPassword = existingUser.password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.usuarios.update({
      where: { userId: Number(id) },
      data: {
        nameUser: nameUser || existingUser.nameUser,
        nickname: nickname || existingUser.nickname,
        email: email || existingUser.email,
        password: updatedPassword,
      },
    });

    return res.status(200).json({
      message: 'Usuário atualizado com sucesso!',
      user: {
        id: updatedUser.userId,
        nameUser: updatedUser.nameUser,
        nickname: updatedUser.nickname,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await prisma.usuarios.findUnique({
            where: { userId: Number(id) },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Error fetching user.' });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
      const users = await prisma.usuarios.findMany();
      return res.status(200).json(users);
  } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};