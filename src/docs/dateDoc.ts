/**
 * @swagger
 * tags:
 *   name: Datas
 *   description: Rotas relacionadas às datas dos jogos anteriores
 */
/**
 * @swagger
 * /date:
 *   get:
 *     summary: Retorna os personagens sorteados por modo de jogo em uma data específica
 *     description: Retorna a lista de personagens sorteados para cada modo de jogo em uma determinada data. Caso nenhuma data seja fornecida, utiliza a data atual.
 *     tags: [Datas]
 *     parameters:
 *       - in: query
 *         name: data
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Data no formato YYYY-MM-DD. Se não for informada, será usada a data atual.
 *     responses:
 *       200:
 *         description: Lista de personagens sorteados para cada modo de jogo na data informada
 *         content:
 *           application/json:
 *             example:
 *               data: "2025-03-25"
 *               personagensSorteados:
 *                 - modoJogo: "clássico"
 *                   personagem: "Arya Stark"
 *                 - modoJogo: "descrição"
 *                   personagem: "Tyrion Lannister"
 *                 - modoJogo: "imagem"
 *                   personagem: "Daenerys Targaryen"
 *       404:
 *         description: Nenhum personagem sorteado encontrado para a data informada
 *       500:
 *         description: Erro interno ao buscar os personagens
 */
