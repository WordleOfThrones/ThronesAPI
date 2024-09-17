/*
  Warnings:

  - Made the column `idPersonagem` on table `Datas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Datas" DROP CONSTRAINT "Datas_idPersonagem_fkey";

-- AlterTable
ALTER TABLE "Datas" ALTER COLUMN "idPersonagem" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Datas" ADD CONSTRAINT "Datas_idPersonagem_fkey" FOREIGN KEY ("idPersonagem") REFERENCES "Personagens"("idPersonagem") ON DELETE RESTRICT ON UPDATE CASCADE;
