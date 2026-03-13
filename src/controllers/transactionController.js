// Importa o service de transação
const transactionService = require("../services/transactionService");

// Controller responsável por receber a requisição
async function createTransaction(req, res) {

  try {

    // Envia os dados da requisição para o service
    const result = await transactionService.createTransaction(req.body);

    // Retorna sucesso
    res.status(201).json(result);

  } catch (error) {

    // Caso aconteça erro
    res.status(500).json({
      error: error.message
    });

  }

}

// Exporta a função
module.exports = { createTransaction };