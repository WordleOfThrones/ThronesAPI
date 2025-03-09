/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Rotas relacionadas a usuários
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     description: Cria um novo usuário na aplicação.
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nameUser
 *               - nickname
 *               - email
 *               - password
 *             properties:
 *               nameUser:
 *                 type: string
 *                 example: "Maykon Willyam"
 *               nickname:
 *                 type: string
 *                 example: "MaykonWSF"
 *               email:
 *                 type: string
 *                 example: "maykon@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Erro na requisição
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Autentica um usuário e gera um token
 *     description: Faz login do usuário e retorna um token JWT.
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "jmaykon@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1Ni..."
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Faz logout do usuário
 *     description: Encerra a sessão do usuário removendo o token.
 *     tags: [Usuários]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       401:
 *         description: Usuário não autenticado
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retorna todos os usuários
 *     description: Obtém uma lista com todos os usuários cadastrados.
 *     tags: [Usuários]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       401:
 *         description: Usuário não autenticado
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     description: Busca um usuário específico pelo ID.
 *     tags: [Usuários]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser buscado
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     description: Atualiza as informações de um usuário pelo ID.
 *     tags: [Usuários]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameUser:
 *                 type: string
 *                 example: "Maykon Willyam"
 *               nickname:
 *                 type: string
 *                 example: "Maykon123"
 *               email:
 *                 type: string
 *                 example: "maykon@gmail.com"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Usuário não encontrado
 */
