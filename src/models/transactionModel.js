// Importa a conexão com o banco
const db = require("../config/db");

// Função responsável por inserir a transação no banco
async function createTransaction(transaction) {

  // Desestrutura os dados recebidos
  const { client, gateway, external_id, status, amount, card_last_numbers } = transaction;

  // Query SQL de inserção
  const [result] = await db.execute(
    `INSERT INTO transactions 
    (client, gateway, external_id, status, amount, card_last_numbers)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [client, gateway, external_id, status, amount, card_last_numbers]
  );

  // Retorna o ID da transação criada
  return result.insertId;
}

module.exports = { createTransaction };