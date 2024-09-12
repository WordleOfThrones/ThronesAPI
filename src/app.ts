import express from 'express';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import characterRoutes from './routes/character';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/upload', uploadRoutes);
app.use('/api', authRoutes); 
app.use('/api', userRoutes); 
app.use('/api', characterRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/api', (req, res) => {
  res.send('API funcionando');
});