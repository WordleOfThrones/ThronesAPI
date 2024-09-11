import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient'; // Certifique-se de que a conexão com o Prisma está correta
import bcrypt from 'bcrypt';

// Função para atualizar um usuário
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params; // Pegando o ID do usuário
    const { nameUser, nickname, email, password } = req.body;

    try {
        // Verificar se o usuário existe
        const existingUser = await prisma.usuarios.findUnique({
            where: { userId: Number(id) }, // Verificar se o ID do usuário é válido
        });

        if (!existingUser) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Atualizar a senha, caso tenha sido fornecida
        let updatedPassword = existingUser.password;
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        // Atualização dos campos do usuário
        const updatedUser = await prisma.usuarios.update({
            where: { userId: Number(id) },
            data: {
                nameUser: nameUser || existingUser.nameUser,  // Se o nome não foi enviado, mantém o atual
                nickname: nickname || existingUser.nickname,  // Se o nickname não foi enviado, mantém o atual
                email: email || existingUser.email,           // Se o email não foi enviado, mantém o atual
                password: updatedPassword,                    // Atualiza a senha se necessário
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
        console.error('Erro ao atualizar usuário:', error);  // Log para depuração
        return res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
    }
};
