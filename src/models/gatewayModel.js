// Importa conexão com banco
const db = require("../config/db");

/*
Busca todos os gateways ativos ordenados pela prioridade
(priority menor = maior prioridade)
*/
async function getGatewaysByPriority() {

  const [rows] = await db.execute(
    "SELECT * FROM gateways WHERE is_active = 1 ORDER BY priority ASC"
  );

  return rows;

}

module.exports = { getGatewaysByPriority };