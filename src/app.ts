import express from 'express';
import cron from 'node-cron';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import characterRoutes from './routes/character';
import { inserirRegistrosDiarios } from './services/dataService';

dotenv.config();

const app = express();
app.use(express.json());

cron.schedule('0 0 * * *', () => {
  console.log('Executando inserção diária de personagens.');
  inserirRegistrosDiarios();
});

app.use('/api', userRoutes);
app.use('/api', characterRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/api', (req, res) => {
  res.send('API funcionando');
});
