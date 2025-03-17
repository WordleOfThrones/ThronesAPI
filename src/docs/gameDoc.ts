/**
 * @swagger
 * tags:
 *   name: Jogos
 *   description: Gerenciamento de partidas realizadas por usuários logados e anônimos
 */

/**
 * @swagger
 * /create-or-update:
 *   post:
 *     summary: Cria ou atualiza um jogo
 *     description: Registra um jogo novo ou atualiza um existente para um usuário, permitindo jogos anônimos.
 *     tags: [Jogos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: integer
 *                 description: ID do usuário que está jogando (opcional para anônimos)
 *                 nullable: true
 *                 example: 1
 *               idModoJogo:
 *                 type: integer
 *                 description: Identificador do modo de jogo.
 *                 example: 2
 *               qtdTentativas:
 *                 type: integer
 *                 example: 5
 *               tempo:
 *                 type: integer
 *                 description: Tempo gasto no jogo (em segundos)
 *                 example: 120
 *               status:
 *                 type: integer
 *                 description: Status do jogo (0 = Em andamento, 1 = Finalizado)
 *                 example: 1
 *               pontuacao:
 *                 type: number
 *                 format: decimal
 *                 example: 95.5
 *     responses:
 *       201:
 *         description: Jogo criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Jogo criado com sucesso!"
 *                 jogo:
 *                   idJogo: 15
 *                   idUser: 1
 *                   idModoJogo: 2
 *                   qtdTentativas: 5
 *                   tempo: 120
 *                   status: 1
 *                   pontuacao: "95.00"
 *                   data: "2024-03-17T00:00:00.000Z"
 *       200:
 *         description: Jogo atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Jogo atualizado com sucesso!"
 *                 jogo:
 *                   idJogo: 15
 *                   idUser: 1
 *                   idModoJogo: 2
 *                   qtdTentativas: 3
 *                   tempo: 80
 *                   status: 1
 *                   pontuacao: 90.00
 *                   data: "2024-03-17T00:00:00.000Z"
 *       400:
 *         description: Erro nos dados fornecidos.
 *       500:
 *         description: Erro interno ao criar ou atualizar o jogo.
*/