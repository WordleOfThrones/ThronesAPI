import { prisma } from '../utils/prismaClient';

export const verificarEAtualizarRecorde = async (idUser: number, data: string) => {
    try {
      const dataFormatada = new Date(data);
      dataFormatada.setHours(0, 0, 0, 0);
  
      console.log(`Verificando recorde para idUser=${idUser} na data=${dataFormatada.toISOString().split('T')[0]}`);
  
      const totalPontuacao = await prisma.jogos.aggregate({
        _sum: { pontuacao: true },
        where: { 
          idUser, 
          data: dataFormatada,
        },
      });
  
      const pontuacaoTotal = totalPontuacao._sum.pontuacao || 0;
  
      console.log(`Pontuação total calculada: ${pontuacaoTotal}`);
  
      const usuario = await prisma.usuarios.findUnique({
        where: { userId: idUser },
        select: { recorde: true },
      });
  
      if (!usuario) {
        console.error(`Usuário com ID ${idUser} não encontrado.`);
        return;
      }
  
      console.log(`Recorde atual do usuário ${idUser}: ${usuario.recorde}`);
  
      // Se a nova pontuação for maior que o recorde atual, atualizar
      if (pontuacaoTotal > (usuario.recorde ?? 0)) {
        await prisma.usuarios.update({
          where: { userId: idUser },
          data: { recorde: pontuacaoTotal },
        });
  
        console.log(`✅ Recorde atualizado para usuário ${idUser}: ${pontuacaoTotal}`);
      } else {
        console.log(`ℹ️ Recorde não atualizado. Pontuação ${pontuacaoTotal} menor ou igual ao recorde atual (${usuario.recorde}).`);
      }
    } catch (error) {
      console.error('❌ Erro ao verificar e atualizar recorde:', error);
    }
  };  