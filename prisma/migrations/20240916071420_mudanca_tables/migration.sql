/*
  Warnings:

  - You are about to drop the column `dataJogo` on the `Jogos` table. All the data in the column will be lost.
  - You are about to alter the column `tempo` on the `Jogos` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the `Data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModoJogo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Personagem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data` to the `Jogos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_idJogo_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_idModoJogo_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_idPersonagem_fkey";

-- DropForeignKey
ALTER TABLE "Jogos" DROP CONSTRAINT "Jogos_idUser_fkey";

-- AlterTable
ALTER TABLE "Jogos" DROP COLUMN "dataJogo",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "tempo" SET DATA TYPE INTEGER;

-- DropTable
DROP TABLE "Data";

-- DropTable
DROP TABLE "ModoJogo";

-- DropTable
DROP TABLE "Personagem";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "Usuarios" (
    "userId" SERIAL NOT NULL,
    "nameUser" VARCHAR(100) NOT NULL,
    "nickname" VARCHAR(30) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "recorde" DECIMAL(10,2),
    "status" INTEGER NOT NULL DEFAULT 1,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Personagens" (
    "idPersonagem" SERIAL NOT NULL,
    "nome" VARCHAR(45) NOT NULL,
    "descricao" VARCHAR(2000) NOT NULL,
    "casa" VARCHAR(100) NOT NULL,
    "genero" CHAR(1) NOT NULL,
    "raca" VARCHAR(45) NOT NULL,
    "titulo" VARCHAR(500) NOT NULL,
    "origem" VARCHAR(100) NOT NULL,
    "religiao" VARCHAR(100) NOT NULL,
    "serie" VARCHAR(45) NOT NULL,
    "primeiraAparicao" VARCHAR(11) NOT NULL,
    "imagem" VARCHAR(300) NOT NULL,
    "imagemAdvinhacao" VARCHAR(300) NOT NULL,

    CONSTRAINT "Personagens_pkey" PRIMARY KEY ("idPersonagem")
);

-- CreateTable
CREATE TABLE "ModosJogo" (
    "idModo" SERIAL NOT NULL,
    "nomeModo" VARCHAR(45) NOT NULL,

    CONSTRAINT "ModosJogo_pkey" PRIMARY KEY ("idModo")
);

-- CreateTable
CREATE TABLE "Datas" (
    "idData" SERIAL NOT NULL,
    "idModoJogo" INTEGER NOT NULL,
    "idPersonagem" INTEGER NOT NULL,
    "idJogo" INTEGER NOT NULL,
    "data" DATE NOT NULL,

    CONSTRAINT "Datas_pkey" PRIMARY KEY ("idData")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_nickname_key" ON "Usuarios"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ModosJogo_nomeModo_key" ON "ModosJogo"("nomeModo");

-- CreateIndex
CREATE UNIQUE INDEX "Datas_data_key" ON "Datas"("data");

-- AddForeignKey
ALTER TABLE "Jogos" ADD CONSTRAINT "Jogos_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuarios"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Datas" ADD CONSTRAINT "Datas_idJogo_fkey" FOREIGN KEY ("idJogo") REFERENCES "Jogos"("idJogo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Datas" ADD CONSTRAINT "Datas_idModoJogo_fkey" FOREIGN KEY ("idModoJogo") REFERENCES "ModosJogo"("idModo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Datas" ADD CONSTRAINT "Datas_idPersonagem_fkey" FOREIGN KEY ("idPersonagem") REFERENCES "Personagens"("idPersonagem") ON DELETE RESTRICT ON UPDATE CASCADE;
