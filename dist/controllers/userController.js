"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUserById = exports.updateUser = exports.registerUser = exports.loginUser = void 0;
const prismaClient_1 = require("../utils/prismaClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prismaClient_1.prisma.usuarios.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.userId, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login realizado com sucesso!',
            token,
        });
    }
    catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameUser, nickname, email, password } = req.body;
    if (!nameUser || !nickname || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        const existingUser = yield prismaClient_1.prisma.usuarios.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já registrado' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prismaClient_1.prisma.usuarios.create({
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
    }
    catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
    }
});
exports.registerUser = registerUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nameUser, nickname, email, password } = req.body;
    try {
        const existingUser = yield prismaClient_1.prisma.usuarios.findUnique({
            where: { userId: Number(id) },
        });
        if (!existingUser) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        let updatedPassword = existingUser.password;
        if (password) {
            updatedPassword = yield bcrypt_1.default.hash(password, 10);
        }
        const updatedUser = yield prismaClient_1.prisma.usuarios.update({
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
    }
    catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
    }
});
exports.updateUser = updateUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prismaClient_1.prisma.usuarios.findUnique({
            where: { userId: Number(id) },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Error fetching user.' });
    }
});
exports.getUserById = getUserById;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prismaClient_1.prisma.usuarios.findMany();
        return res.status(200).json(users);
    }
    catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});
exports.getAllUsers = getAllUsers;
