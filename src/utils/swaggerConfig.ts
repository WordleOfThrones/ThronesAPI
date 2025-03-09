import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { getThemeSync } from '@intelika/swagger-theme';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Wordle of Thrones API",
      version: "1.0.0",
      description: "Documentação da API do Wordle of Thrones",
    },
    servers: [
      {
        url: "https://thronesapi-1.onrender.com",
        description: "Servidor de Produção",
      },
      {
        url: "http://localhost:3300/api",
        description: "Servidor Local",
      },
    ],
  },
  apis: ["./src/docs/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);
console.log("Rotas carregadas pelo Swagger:", (swaggerSpec as any).paths);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        customCss: getThemeSync().toString()
      }));
  console.log("📄 Swagger disponível em: http://localhost:3300/api-docs");
};