/*
  Warnings:

  - A unique constraint covering the columns `[idModoJogo,data]` on the table `Datas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Datas_idModoJogo_data_key" ON "Datas"("idModoJogo", "data");
