// Importa o Express
const express = require("express");

// Cria o router
const router = express.Router();

// Importa o controller
const transactionController = require("../controllers/transactionController");

// Rota responsável por criar uma transação
router.post("/transactions", transactionController.createTransaction);

// Exporta o router
module.exports = router;