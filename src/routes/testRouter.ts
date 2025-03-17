import express from 'express';
import { personagemFoiSorteadoRecentemente } from '../services/dateService';
import { prisma } from '../utils/prismaClient';

const router = express.Router();

export default router;