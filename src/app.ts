import express from 'express';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/upload', uploadRoutes);
app.use('/api', authRoutes); 
app.use('/api', userRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/api', (req, res) => {
  res.send('API funcionando');
});