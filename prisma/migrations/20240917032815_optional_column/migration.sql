-- DropForeignKey
ALTER TABLE "Datas" DROP CONSTRAINT "Datas_idPersonagem_fkey";

-- AlterTable
ALTER TABLE "Datas" ALTER COLUMN "idPersonagem" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Datas" ADD CONSTRAINT "Datas_idPersonagem_fkey" FOREIGN KEY ("idPersonagem") REFERENCES "Personagens"("idPersonagem") ON DELETE SET NULL ON UPDATE CASCADE;
