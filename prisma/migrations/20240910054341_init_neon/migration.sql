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

    CONSTRAINT "Personagens_pkey" PRIMARY KEY ("idPersonagem")
);

-- CreateTable
CREATE TABLE "Jogos" (
    "idJogo" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "data" INTEGER NOT NULL,
    "qtdTentativas" INTEGER NOT NULL,
    "tempo" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "pontuacaoDia" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Jogos_pkey" PRIMARY KEY ("idJogo")
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
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Datas_data_key" ON "Datas"("data");

-- AddForeignKey
ALTER TABLE "Jogos" ADD CONSTRAINT "Jogos_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuarios"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Datas" ADD CONSTRAINT "Datas_idModoJogo_fkey" FOREIGN KEY ("idModoJogo") REFERENCES "ModosJogo"("idModo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Datas" ADD CONSTRAINT "Datas_idPersonagem_fkey" FOREIGN KEY ("idPersonagem") REFERENCES "Personagens"("idPersonagem") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Datas" ADD CONSTRAINT "Datas_idJogo_fkey" FOREIGN KEY ("idJogo") REFERENCES "Jogos"("idJogo") ON DELETE RESTRICT ON UPDATE CASCADE;
