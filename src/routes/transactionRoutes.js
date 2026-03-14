// Importa o Express
const express = require("express");

// Cria um roteador
const router = express.Router();

// Importa o controller responsável pelas transações
const transactionController = require("../controllers/transactionController");

/*
Rota responsável por criar uma nova transação

POST /api/transactions
*/
router.post("/transactions", transactionController.createTransaction);

// Exporta o roteador para ser usado no app.js
module.exports = router;