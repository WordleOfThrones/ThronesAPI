-- CreateTable
CREATE TABLE "Usuario" (
    "userId" SERIAL NOT NULL,
    "nameUser" VARCHAR(100) NOT NULL,
    "nickname" VARCHAR(30) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "recorde" DOUBLE PRECISION,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Personagem" (
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
    "primeiraAparicao" VARCHAR(100) NOT NULL,
    "imagem" VARCHAR(200) NOT NULL,

    CONSTRAINT "Personagem_pkey" PRIMARY KEY ("idPersonagem")
);

-- CreateTable
CREATE TABLE "Jogos" (
    "idJogo" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "dataJogo" TIMESTAMP(3) NOT NULL,
    "qtdTentativas" INTEGER NOT NULL,
    "tempo" DOUBLE PRECISION NOT NULL,
    "pontuacaoDia" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Jogos_pkey" PRIMARY KEY ("idJogo")
);

-- CreateTable
CREATE TABLE "ModoJogo" (
    "idModo" SERIAL NOT NULL,
    "nomeModo" VARCHAR(45) NOT NULL,

    CONSTRAINT "ModoJogo_pkey" PRIMARY KEY ("idModo")
);

-- CreateTable
CREATE TABLE "Data" (
    "idData" SERIAL NOT NULL,
    "idModoJogo" INTEGER NOT NULL,
    "idPersonagem" INTEGER NOT NULL,
    "idJogo" INTEGER NOT NULL,
    "data" DATE NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("idData")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Jogos" ADD CONSTRAINT "Jogos_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_idModoJogo_fkey" FOREIGN KEY ("idModoJogo") REFERENCES "ModoJogo"("idModo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_idPersonagem_fkey" FOREIGN KEY ("idPersonagem") REFERENCES "Personagem"("idPersonagem") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_idJogo_fkey" FOREIGN KEY ("idJogo") REFERENCES "Jogos"("idJogo") ON DELETE RESTRICT ON UPDATE CASCADE;
