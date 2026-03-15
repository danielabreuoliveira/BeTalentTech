const express = require('express');
const router = express.Router();
const { refundTransaction } = require('../controllers/refundController');

router.post('/:id', refundTransaction);

module.exports = router;