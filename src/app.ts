import cors from 'cors';
import express from 'express';
import cron from 'node-cron';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user';
import characterRoutes from './routes/character'; 
import gameRoutes from './routes/game';
import { inserirRegistrosDiarios } from './services/dataService'; 
import testRoutes from './routes/test';

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'https://wordleofthrones.vercel.app', 
  'https://wordleofthrones-nn604k8ws-avelar-rodrigues-de-sousas-projects.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

cron.schedule("5 0 * * *", async () => {
  console.log("Executando inserção diária de personagens...");

  try {
    await inserirRegistrosDiarios();
    console.log("Inserção diária concluída!");
  } catch (error) {
    console.error("Erro ao executar inserção diária:", error);
  }
});

app.get('/api/inserir-registros', async (req, res) => {
  try {
    await inserirRegistrosDiarios();
    res.status(200).send('Inserção de personagens feita com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir personagens:', error);
    res.status(500).send('Erro ao inserir personagens.');
  }
});

app.use('/api', userRoutes);
app.use('/api', characterRoutes);
app.use('/api', gameRoutes); 
app.use(testRoutes);

app.get('/api', (req, res) => {
  res.send('API funcionando');
});

app.get('/api/wake-up', (req, res) => {
  res.send('Mantendo a API acordada!');
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});