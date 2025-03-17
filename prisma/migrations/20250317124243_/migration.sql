-- DropForeignKey
ALTER TABLE "Jogos" DROP CONSTRAINT "Jogos_idUser_fkey";

-- AlterTable
ALTER TABLE "Jogos" ALTER COLUMN "idUser" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Jogos" ADD CONSTRAINT "Jogos_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuarios"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
