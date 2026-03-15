function validateCreateTransaction(data) {
  const errors = [];

  if (!data.client) errors.push('O campo client é obrigatório');
  if (data.amount === undefined || data.amount === null) errors.push('O campo amount é obrigatório');
  if (!data.card_last_numbers) errors.push('O campo card_last_numbers é obrigatório');

  if (data.amount !== undefined && typeof data.amount !== 'number') {
    errors.push('O campo amount deve ser numérico');
  }

  if (
    data.card_last_numbers &&
    (typeof data.card_last_numbers !== 'string' || data.card_last_numbers.length !== 4)
  ) {
    errors.push('O campo card_last_numbers deve conter 4 dígitos');
  }

  return errors;
}

module.exports = { validateCreateTransaction };