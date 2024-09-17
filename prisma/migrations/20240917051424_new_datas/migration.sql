-- DropForeignKey
ALTER TABLE "Datas" DROP CONSTRAINT "Datas_idJogo_fkey";

-- AlterTable
ALTER TABLE "Datas" ALTER COLUMN "idJogo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Datas" ADD CONSTRAINT "Datas_idJogo_fkey" FOREIGN KEY ("idJogo") REFERENCES "Jogos"("idJogo") ON DELETE SET NULL ON UPDATE CASCADE;
