import cors from 'cors';
import express from 'express';
import cron from 'node-cron';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import characterRoutes from './routes/character'; 
import gameRoutes from './routes/game';
import { inserirRegistrosDiarios } from './services/dataService'; 

dotenv.config(); 

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

cron.schedule('0 0 * * *', () => {
  console.log('Executando inserção diária de personagens.');
  inserirRegistrosDiarios();
});

app.get('/api/test-inserir', async (req, res) => {
  try {
    await inserirRegistrosDiarios();
    res.status(200).send('Inserção de personagens feita com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao inserir personagens.');
  }
});

app.use('/api/users', userRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/games', gameRoutes); 

app.get('/api', (req, res) => {
  res.send('API funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
