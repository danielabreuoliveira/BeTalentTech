// Importa conexão com banco
const db = require("../config/db");

/*
Insere uma nova transação no banco de dados
*/
async function createTransaction(data) {

  const [result] = await db.execute(
    `INSERT INTO transactions 
    (client, gateway, external_id, status, amount, card_last_numbers)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.client,
      data.gateway,
      data.external_id,
      data.status,
      data.amount,
      data.card_last_numbers
    ]
  );

  // Retorna o ID da transação criada
  return result.insertId;

}

module.exports = { createTransaction };