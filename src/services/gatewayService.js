// Biblioteca usada para fazer requisições HTTP
const axios = require("axios");

/*
Função responsável por tentar realizar a cobrança
em um gateway de pagamento externo
*/
async function chargeGateway(gateway, dados) {

  try {

    // Envia requisição para o gateway
    await axios.post(gateway.api_url, {
      amount: dados.amount,
      card_last_numbers: dados.card_last_numbers
    });

    // Caso não ocorra erro, consideramos sucesso
    return { sucesso: true };

  } catch (error) {

    // Caso ocorra erro na requisição
    return { sucesso: false };

  }

}

module.exports = { chargeGateway };