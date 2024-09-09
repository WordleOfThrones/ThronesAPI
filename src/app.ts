import express from 'express';
import uploadRoutes from './routes/upload';

const app = express();
app.use(express.json());

app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
