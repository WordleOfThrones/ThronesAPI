/**
 * @swagger
 * tags:
 *   name: Jogos
 *   description: Gerenciamento de partidas realizadas por usuários logados e anônimos
 */

/**
 * @swagger
 * /game/:
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
 
/**
 * @swagger
 * /game/{idUser}/score:
 *   get:
 *     summary: Obtém a pontuação total de um usuário em uma data específica.
 *     description: Retorna a pontuação total e detalhes dos jogos realizados por um usuário em uma determinada data. Se nenhuma data for fornecida, retorna a pontuação do dia atual.
 *     tags: [Jogos]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário.
 *         example: 1
 *       - in: query
 *         name: data
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Data dos jogos no formato YYYY-MM-DD. Opcional, retorna data atual se não informada.
 *         example: "2025-03-17"
 *       - in: query
 *         name: idModoJogo
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID do modo de jogo específico para filtrar a pontuação.
 *         example: 2
 *     responses:
 *       200:
 *         description: Pontuação total retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "2025-03-17"
 *                 pontuacaoTotal:
 *                   type: number
 *                   example: 187.00
 *                 jogos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       modoJogo:
 *                         type: string
 *                         example: "Clássico"
 *                       pontuacao:
 *                         type: string
 *                         example: "95.00"
 *                       qtdTentativas:
 *                         type: integer
 *                         example: 3
 *                       tempo:
 *                         type: integer
 *                         example: 60
 *                       status:
 *                         type: integer
 *                         example: 1
 *       400:
 *         description: Parâmetro idUser inválido.
 *       404:
 *         description: Nenhum jogo encontrado para esse usuário nesta data/modo.
 *       500:
 *         description: Erro ao buscar pontuação do usuário.
 */