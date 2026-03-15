// src/mocks/gateway1.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/charge', (req, res) => {
  const { amount, name, email, cardNumber, cvv } = req.body;

  // Aceita qualquer valor
  if (!amount || !cardNumber) {
    return res.status(400).json({ status: 'error', message: 'Campos obrigatórios faltando' });
  }

  return res.status(200).json({
    status: 'success',
    external_id: `gw1_${Date.now()}`
  });
});

app.listen(3001, () => console.log('Gateway 1 rodando na porta 3001'));

app.post('/refund', (req, res) => {
  const { external_id, amount } = req.body;
  if (!external_id || !amount) return res.status(400).json({ status: 'error', message: 'Campos obrigatórios faltando' });

  // Simula sucesso
  return res.status(200).json({ status: 'success' });
});