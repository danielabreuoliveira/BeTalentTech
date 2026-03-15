const express = require('express');
const router = express.Router();
const refundController = require('../controllers/refundController');

// Rota para solicitar reembolso pelo id da transação
router.post('/:id', refundController.refundTransaction);

module.exports = router;