// Importa o framework Express
const express = require("express");

// Cria a aplicação
const app = express();

// Importa as rotas de transações
const transactionRoutes = require("./src/routes/transactionRoutes");

// Middleware para permitir que a API leia JSON nas requisições
app.use(express.json());

// Prefixo das rotas da API
app.use("/api", transactionRoutes);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});