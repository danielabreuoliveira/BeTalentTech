const express = require('express');
const app = express();
app.use(express.json());

// Mock de cobrança
app.post('/charge', (req, res) => {
  const { valor } = req.body;
  if (valor > 3000) { // simula erro acima de certo valor
    return res.status(500).json({ status: 'error', message: 'Falha no gateway secundário.' });
  }

  return res.status(200).json({
    status: 'success',
    external_id: `gw2_${Date.now()}`
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
    message: 'Reembolso aprovado pelo Gateway 2'
  });
});

app.listen(3002, () => {
  console.log('Gateway 2 rodando na porta 3002');
});