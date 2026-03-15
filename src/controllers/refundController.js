const db = require('../database/connection');
const axios = require('axios');

// URLs dos gateways
const gatewayUrls = {
  1: 'http://localhost:3001/refund',
  2: 'http://localhost:3002/refund'
};

// Reembolsar transação
async function refundTransaction(req, res) {
  try {
    const { id } = req.params;

    // Buscar transação
    const transaction = await db('transactions').where({ id }).first();
    if (!transaction) {
      return res.status(404).json({ mensagem: 'Transação não encontrada' });
    }

    // Envia requisição de reembolso para o gateway correspondente
    const payload = {
      external_id: transaction.external_id,
      amount: transaction.amount
    };

    const response = await axios.post(gatewayUrls[transaction.gateway], payload);

    if (response.data && response.data.status === 'success') {
      // Atualiza status no banco
      await db('transactions')
        .where({ id })
        .update({ status: 'refunded' });

      return res.status(200).json({
        mensagem: 'Reembolso efetuado com sucesso',
        transacao: { ...transaction, status: 'refunded' }
      });
    } else {
      return res.status(400).json({
        mensagem: 'Erro ao reembolsar a transação',
        erro: response.data.message || 'Gateway retornou erro'
      });
    }
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao reembolsar a transação',
      erro: error.message
    });
  }
}

module.exports = { refundTransaction };