// Importa o service que contém a lógica de negócio
const transactionService = require("../services/transactionService");

/*
Controller responsável por criar uma transação
Recebe os dados da requisição e envia para o service
*/
async function createTransaction(req, res) {

  try {

    // Dados enviados pelo cliente
    const dadosTransacao = req.body;

    // Chama o serviço responsável pelo processamento da transação
    const resultado = await transactionService.createTransaction(dadosTransacao);

    // Retorna sucesso para o usuário
    res.status(201).json({
      sucesso: true,
      mensagem: "Transação realizada com sucesso",
      dados: resultado
    });

  } catch (error) {

    // Caso ocorra erro, retorna mensagem
    res.status(400).json({
      sucesso: false,
      mensagem: error.message
    });

  }

}

// Exporta a função
module.exports = { createTransaction };