// src/controllers/transactionController.js
const db = require('../database/connection');
const axios = require('axios');

// URLs dos gateways mockados
const gatewayUrls = {
  1: 'http://localhost:3001/charge',
  2: 'http://localhost:3002/charge'
};

// Criar transação
async function createTransaction(req, res) {
  try {
    const { amount, name, email, cardNumber, cvv, valor, numeroCartao } = req.body;

    // Mapear campos para padrão interno
    let clientAmount, clientCard, clientName, clientEmail;
    if (amount && cardNumber) { // Gateway 1
      clientAmount = amount;
      clientCard = cardNumber;
      clientName = name;
      clientEmail = email;
    } else if (valor && numeroCartao) { // Gateway 2
      clientAmount = valor;
      clientCard = numeroCartao;
      clientName = name || null;
      clientEmail = email || null;
    } else {
      return res.status(400).json({
        mensagem: 'Campos obrigatórios do cliente faltando'
      });
    }

    // Criar ou buscar cliente pelo email
    let clientRecord = await db('clients').where({ email: clientEmail }).first();
    if (!clientRecord) {
      const [clientId] = await db('clients').insert({ name: clientName, email: clientEmail });
      clientRecord = await db('clients').where({ id: clientId }).first();
    }

    // Buscar gateways ativos por prioridade
    const gateways = await db('gateways').where({ is_active: 1 }).orderBy('priority', 'asc');
    if (!gateways.length) return res.status(400).json({ mensagem: 'Nenhum gateway ativo encontrado' });

    let ultimoErro = null;

    for (const gateway of gateways) {
      try {
        let payload;
        let clientCardLastNumbers;

        if (gateway.id === 1) {
          payload = { amount: clientAmount, name: clientName, email: clientEmail, cardNumber: clientCard, cvv };
          clientCardLastNumbers = clientCard.slice(-4); // últimos 4 dígitos
        } else { // gateway 2
          payload = { valor: clientAmount, nome: clientName, email: clientEmail, numeroCartao: clientCard, cvv };
          clientCardLastNumbers = clientCard.slice(-4); // últimos 4 dígitos
        }

        const response = await axios.post(gatewayUrls[gateway.id], payload);

        if (response.data && response.data.status === 'success') {
          const [transactionId] = await db('transactions').insert({
            client: clientRecord.id,
            gateway: gateway.id,
            external_id: response.data.external_id,
            status: response.data.status,
            amount: clientAmount,
            card_last_numbers: clientCardLastNumbers
          });

          const transaction = await db('transactions').where({ id: transactionId }).first();

          return res.status(201).json({
            mensagem: 'Transação processada com sucesso',
            transacao: transaction
          });
        }
      } catch (error) {
        ultimoErro = error.message;
      }
    }

    return res.status(400).json({
      mensagem: 'Não foi possível processar a transação em nenhum gateway',
      erro: ultimoErro
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao criar transação',
      erro: error.message
    });
  }
}

// Listar todas as transações
async function listTransactions(req, res) {
  try {
    const transactions = await db('transactions').select('*');
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao listar transações', erro: error.message });
  }
}

module.exports = {
  createTransaction,
  listTransactions
};