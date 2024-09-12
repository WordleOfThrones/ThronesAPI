/*
  Warnings:

  - A unique constraint covering the columns `[nickname]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imagemAdvinhacao` to the `Personagens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Personagens" ADD COLUMN     "imagemAdvinhacao" VARCHAR(300) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_nickname_key" ON "Usuarios"("nickname");
