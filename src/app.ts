import cors from "cors";
import express from "express";
import cron from "node-cron";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./utils/swaggerConfig";
import userRoutes from "./routes/userRouter";
import characterRoutes from "./routes/characterRouter";
import gameRoutes from "./routes/gameRouter";
import dateRoutes from "./routes/dateRouter";
import { inserirRegistrosDiarios } from "./services/dateService";
import testRoutes from "./routes/testRouter";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://wordleofthrones.vercel.app",
  "https://wordleofthrones-nn604k8ws-avelar-rodrigues-de-sousas-projects.vercel.app",
  "http://localhost:3000",
  "https://wordle-of-thrones-projeto.vercel.app",
  "https://wordle-of-thrones-4iwq-git-feature-carls-projects-c602a40b.vercel.app",
  "https://wordle-of-thrones-qdyvs6by3-carls-projects-c602a40b.vercel.app",
  "https://wordle-of-thrones-4iwq.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

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

app.get("/api/inserir-registros", async (req, res) => {
  try {
    await inserirRegistrosDiarios();
    res.status(200).send("Inserção de personagens feita com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir personagens:", error);
    res.status(500).send("Erro ao inserir personagens.");
  }
});

app.use("/api", userRoutes);
app.use("/api", characterRoutes);
app.use("/api", gameRoutes);
app.use("/api", dateRoutes);
app.use(testRoutes);

app.get("/api", (req, res) => {
  res.send("API funcionando");
});

app.get("/api/wake-up", (req, res) => {
  res.send("Mantendo a API acordada!");
});

const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});