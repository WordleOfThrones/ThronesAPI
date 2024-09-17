import { prisma } from '../utils/prismaClient';

const personagemFoiSorteadoRecentemente = async (idPersonagem: number, idModoJogo: number): Promise<boolean> => {
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

  const sorteioRecente = await prisma.datas.findFirst({
    where: {
      idPersonagem,
      idModoJogo,
      data: {
        gte: trintaDiasAtras,
      },
    },
  });

  return sorteioRecente !== null;
};

export const inserirRegistrosDiarios = async () => {
  try {
    const modosJogo = await prisma.modosJogo.findMany({
      select: {
        idModo: true,
      },
    });

    const personagens = await prisma.personagens.findMany({
      select: {
        idPersonagem: true,
      },
    });

    if (personagens.length === 0 || modosJogo.length === 0) {
      console.error('Nenhum personagem ou modo de jogo encontrado.');
      return;
    }

    for (const modo of modosJogo) {
      let personagemAleatorio;
      let tentativa = 0;
      let personagemSorteado = false;

      while (!personagemSorteado && tentativa < 10) {
        const randomIndex = Math.floor(Math.random() * personagens.length);
        personagemAleatorio = personagens[randomIndex];

        const foiSorteado = await personagemFoiSorteadoRecentemente(personagemAleatorio.idPersonagem, modo.idModo);

        if (!foiSorteado) {
          personagemSorteado = true;
        } else {
          tentativa++;
        }
      }

      if (!personagemAleatorio) {
        console.error('Nenhum personagem foi sorteado corretamente.');
        return;
      }

      await prisma.datas.create({
        data: {
          idPersonagem: personagemAleatorio.idPersonagem,
          idModoJogo: modo.idModo,
          idJogo: undefined,
          data: new Date(),
        },
      });

      console.log(`Personagem ${personagemAleatorio.idPersonagem} sorteado para o Modo ${modo.idModo}`);
    }

    console.log('Registros diários inseridos com sucesso!');
    
  } catch (error) {
    console.error('Erro ao inserir registros diários:', error);
  }
};
