/*
  Warnings:

  - You are about to drop the column `idJogo` on the `Datas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Datas" DROP CONSTRAINT "Datas_idJogo_fkey";

-- AlterTable
ALTER TABLE "Datas" DROP COLUMN "idJogo";
