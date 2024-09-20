/*
  Warnings:

  - Added the required column `idModoJogo` to the `Jogos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jogos" ADD COLUMN     "idModoJogo" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Jogos" ADD CONSTRAINT "Jogos_idModoJogo_fkey" FOREIGN KEY ("idModoJogo") REFERENCES "ModosJogo"("idModo") ON DELETE RESTRICT ON UPDATE CASCADE;
