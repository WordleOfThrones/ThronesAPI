import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";

export const getSortersByDate = async (req: Request, res: Response) => {
  try {
    const { data } = req.query;

    const dataConsulta = data
    ? new Date(data as string) // Usa a data como foi passada, sem mexer
    : (() => {
      const hoje = new Date();
      hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset()); // Corrige fuso apenas se for "hoje"
      return hoje;
    })();

    const dataFormatada = dataConsulta.toISOString().split('T')[0];

    console.log(` Consultando personagens sorteados em: ${dataFormatada}`);

    const sorteios = await prisma.datas.findMany({
      where: {
        data: new Date(dataFormatada),
      },
      include: {
        personagem: true,
        modoJogo: true,
      },
    });

    if (!sorteios || sorteios.length === 0) {
      return res.status(404).json({ error: "Nenhum personagem encontrado para esta data." });
    }

    const personagensPorModo = sorteios.map(s => ({
      modoJogo: s.modoJogo.nomeModo,
      personagem: s.personagem.nome,
    }));

    res.status(200).json({
      data: dataFormatada,
      personagensSorteados: personagensPorModo,
    });

  } catch (error) {
    console.error("❌ Erro ao buscar personagens por data:", error);
    res.status(500).json({ error: "Erro ao buscar personagens por data." });
  }
};
