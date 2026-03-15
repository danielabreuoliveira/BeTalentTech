const express = require('express');
const app = express();
app.use(express.json());

// Mock de cobrança
app.post('/charge', (req, res) => {
  const { amount } = req.body;
  if (amount > 3000) { // simula erro acima de certo valor
    return res.status(500).json({ status: 'error', message: 'Falha no gateway principal.' });
  }

  return res.status(200).json({
    status: 'success',
    external_id: `gw1_${Date.now()}`
  });
});

// Mock de reembolso
app.post('/refund', (req, res) => {
  const { external_id, amount, card_last_numbers } = req.body;

  if (!external_id || !amount || !card_last_numbers) {
    return res.status(400).json({ status: 'error', message: 'Dados do reembolso incompletos.' });
  }

  return res.status(200).json({
    status: 'success',
    external_id,
    message: 'Reembolso aprovado pelo Gateway 1'
  });
});

app.listen(3001, () => {
  console.log('Gateway 1 rodando na porta 3001');
});