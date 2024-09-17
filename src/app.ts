import express from 'express';
import cron from 'node-cron';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import characterRoutes from './routes/character'; 
import gameRoutes from './routes/game';
import gameModeRoutes from './routes/gameMode'; 
import { inserirRegistrosDiarios } from './services/dataService'; 

dotenv.config(); 

const app = express();
app.use(express.json());

cron.schedule('0 0 * * *', () => {
  console.log('Executando inserção diária de personagens.');
  inserirRegistrosDiarios();
});

app.use('/api/users', userRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/games', gameRoutes); 
app.use('/api/game-modes', gameModeRoutes);

app.get('/api', (req, res) => {
  res.send('API funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
