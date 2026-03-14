// Importa o framework Express para criar a API
const express = require("express");

// Importa as rotas de transação
const transactionRoutes = require("./src/routes/transactionRoutes");

// Cria a aplicação
const app = express();

// Permite que a API receba dados em JSON
app.use(express.json());

// Define o prefixo das rotas da API
app.use("/api", transactionRoutes);

// Define a porta do servidor
const PORT = 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});