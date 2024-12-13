import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
await prisma.modosJogo.createMany({
  data: [
    { nomeModo: 'Modo Clássico' },
    { nomeModo: 'Modo Difícil' },
    { nomeModo: 'Modo Rápido' },
  ],
});

console.log('Seed concluído.');
}

main()
.catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
});
