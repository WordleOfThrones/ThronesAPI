/**
 * @swagger
 * tags:
 *   name: Personagens
 *   description: Rotas relacionadas aos personagens do jogo
 */

/**
 * @swagger
 * /character/{id}:
 *   get:
 *     summary: Obtém um personagem pelo ID
 *     description: Retorna os detalhes completos de um personagem específico pelo ID.
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do personagem a ser buscado
 *     responses:
 *       200:
 *         description: Personagem encontrado com sucesso
 *       404:
 *         description: Personagem não encontrado
 */

/**
 * @swagger
 * /character:
 *   get:
 *     summary: Busca um personagem pelo nome
 *     description: Retorna um personagem específico com base no nome fornecido.
 *     tags: [Personagens]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do personagem
 *     responses:
 *       200:
 *         description: Personagem encontrado com sucesso
 *       404:
 *         description: Personagem não encontrado
 */

/**
 * @swagger
 * /character-all:
 *   get:
 *     summary: Retorna todos os personagens
 *     description: Obtém uma lista com todos os personagens disponíveis no jogo.
 *     tags: [Personagens]
 *     responses:
 *       200:
 *         description: Lista de personagens retornada com sucesso
 */

/**
 * @swagger
 * /character/sorted-character/{id}:
 *   get:
 *     summary: Obtém o personagem sorteado do dia para um modo de jogo
 *     description: Retorna o personagem sorteado no dia atual para um modo específico.
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do modo de jogo
 *       - in: query
 *         name: data
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Data opcional para buscar o personagem (YYYY-MM-DD). Se não informado, usa o dia atual.
 *     responses:
 *       200:
 *         description: Personagem encontrado
 */

/**
 * @swagger
 * /character:
 *   post:
 *     summary: Cadastra um novo personagem
 *     description: Adiciona um novo personagem ao banco de dados.
 *     tags: [Personagens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *               - casa
 *               - genero
 *               - raca
 *               - titulo
 *               - origem
 *               - religiao
 *               - serie
 *               - primeiraAparicao
 *               - imagem
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Arya Stark"
 *               descricao:
 *                 type: string
 *                 example: "Uma jovem guerreira habilidosa que faz parte da Casa Stark."
 *               casa:
 *                 type: string
 *                 example: "Stark"
 *               genero:
 *                 type: string
 *                 example: "F"
 *               raca:
 *                 type: string
 *                 example: "Humana"
 *               titulo:
 *                 type: string
 *                 example: "Ninguém"
 *               origem:
 *                 type: string
 *                 example: "Winterfell"
 *               religiao:
 *                 type: string
 *                 example: "Deus de Muitas Faces"
 *               serie:
 *                 type: string
 *                 example: "Game of Thrones"
 *               primeiraAparicao:
 *                 type: string
 *                 example: "Temporada 1"
 *               imagem:
 *                 type: string
 *                 example: "https://link-da-imagem.com/arya.jpg"
 *     responses:
 *       201:
 *         description: Personagem cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar personagem
 */

/**
 * @swagger
 * /character/{id}:
 *   put:
 *     summary: Atualiza um personagem pelo ID
 *     description: Modifica as informações de um personagem já cadastrado.
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do personagem a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Arya Stark"
 *               titulo:
 *                 type: string
 *                 example: "A Assassina Sem Rosto"
 *     responses:
 *       200:
 *         description: Personagem atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Personagem não encontrado
 */

/**
 * @swagger
 * /character/{id}:
 *   delete:
 *     summary: Remove um personagem pelo ID
 *     description: Exclui um personagem do banco de dados pelo ID informado.
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do personagem a ser deletado
 *     responses:
 *       200:
 *         description: Personagem removido com sucesso
 *       404:
 *         description: Personagem não encontrado
 */
