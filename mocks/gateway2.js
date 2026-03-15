// src/mocks/gateway2.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/charge', (req, res) => {
  const { valor, numeroCartao, nome, email, cvv } = req.body;

  // Aceita qualquer valor
  if (!valor || !numeroCartao) {
    return res.status(400).json({ status: 'error', message: 'Campos obrigatórios faltando' });
  }

  return res.status(200).json({
    status: 'success',
    external_id: `gw2_${Date.now()}`
  });
});

app.listen(3002, () => console.log('Gateway 2 rodando na porta 3002'));

app.post('/refund', (req, res) => {
  const { external_id, amount } = req.body;
  if (!external_id || !amount) return res.status(400).json({ status: 'error', message: 'Campos obrigatórios faltando' });

  // Simula sucesso
  return res.status(200).json({ status: 'success' });
});