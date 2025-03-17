/*
  Warnings:

  - You are about to drop the column `pontuacaoDia` on the `Jogos` table. All the data in the column will be lost.
  - Added the required column `pontuacao` to the `Jogos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jogos" DROP COLUMN "pontuacaoDia",
ADD COLUMN     "pontuacao" DECIMAL(10,2) NOT NULL;
