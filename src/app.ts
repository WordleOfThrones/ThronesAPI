import cors from 'cors';
import express from 'express';
import cron from 'node-cron';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { setupSwagger } from "./utils/swaggerConfig";
import userRoutes from './routes/userRouter';
import characterRoutes from './routes/characterRouter'; 
import gameRoutes from './routes/gameRouter';
import { inserirRegistrosDiarios } from './services/dateService'; 
import testRoutes from './routes/testRouter';

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
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

setupSwagger(app);

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

const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});