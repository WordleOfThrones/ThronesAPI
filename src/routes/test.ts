import express from 'express';
import { personagemFoiSorteadoRecentemente } from '../services/dataService';
import { prisma } from '../utils/prismaClient';

const router = express.Router();

export default router;