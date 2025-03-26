import express from 'express';
import { getSortersByDate } from '../controllers/dateController';
import { prisma } from '../utils/prismaClient';

const router = express.Router();

router.get('/date', getSortersByDate);

export default router;