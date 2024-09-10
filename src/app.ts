import express from 'express';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload';
import authRoutes from './routes/auth'

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/upload', uploadRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
