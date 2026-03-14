// Importa os modelos necessários
const gatewayModel = require("../models/gatewayModel");
const transactionModel = require("../models/transactionModel");
const gatewayService = require("./gatewayService");

/*
Função responsável por processar uma transação
Ela tenta realizar o pagamento em múltiplos gateways
seguindo a ordem de prioridade
*/
async function createTransaction(dados) {

  // Busca todos os gateways ativos ordenados por prioridade
  const gateways = await gatewayModel.getGatewaysByPriority();

  let gatewayUtilizado = null;

  /*
  Percorre todos os gateways tentando realizar a cobrança
  */
  for (const gateway of gateways) {

    // Tenta cobrar no gateway atual
    const respostaGateway = await gatewayService.chargeGateway(gateway, dados);

    // Se o pagamento for aprovado
    if (respostaGateway.sucesso) {

      gatewayUtilizado = gateway;

      break; // para o loop pois já tivemos sucesso

    }

  }

  // Caso nenhum gateway funcione
  if (!gatewayUtilizado) {
    throw new Error("Não foi possível processar o pagamento em nenhum gateway");
  }

  // Salva a transação no banco de dados
  const transactionId = await transactionModel.createTransaction({
    client: dados.client,
    gateway: gatewayUtilizado.id,
    amount: dados.amount,
    status: "aprovado",
    external_id: "EXT-" + Date.now(),
    card_last_numbers: dados.card_last_numbers
  });

  // Retorna dados da transação
  return {
    id_transacao: transactionId,
    gateway: gatewayUtilizado.name
  };

}

module.exports = { createTransaction };