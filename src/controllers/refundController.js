const db = require('../database/connection');
const axios = require('axios');

// URLs dos gateways mockados (ajuste se precisar)
const gatewayUrls = {
  1: 'http://localhost:3001/refund',
  2: 'http://localhost:3002/refund'
};

/**
 * Solicita reembolso de uma transação pelo id
 */
async function refundTransaction(req, res) {
  try {
    const { id } = req.params;

    // Busca a transação no banco
    const transaction = await db('transactions').where({ id }).first();

    if (!transaction) {
      return res.status(404).json({ mensagem: 'Transação não encontrada' });
    }

    // Identifica o gateway que processou a transação
    const gatewayId = transaction.gateway;
    const url = gatewayUrls[gatewayId];

    if (!url) {
      return res.status(400).json({ mensagem: 'Gateway do reembolso não encontrado' });
    }

    // Envia payload de reembolso para o gateway
    const payload = {
      external_id: transaction.external_id,
      amount: transaction.amount,
      card_last_numbers: transaction.card_last_numbers
    };

    const response = await axios.post(url, payload);

    if (response.data && response.data.status === 'success') {
      // Atualiza status da transação no banco
      await db('transactions')
        .where({ id })
        .update({ status: 'refunded' });

      return res.status(200).json({
        mensagem: 'Reembolso realizado com sucesso',
        transacao: { ...transaction, status: 'refunded' }
      });
    }

    return res.status(400).json({
      mensagem: 'Não foi possível processar o reembolso no gateway',
      erro: response.data
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao reembolsar a transação',
      erro: error.message
    });
  }
}

module.exports = { refundTransaction };