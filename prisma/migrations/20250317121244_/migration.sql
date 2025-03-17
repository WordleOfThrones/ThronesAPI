/*
  Warnings:

  - A unique constraint covering the columns `[idUser,data,idModoJogo]` on the table `Jogos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Jogos_idUser_data_idModoJogo_key" ON "Jogos"("idUser", "data", "idModoJogo");
