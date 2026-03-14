const vine = require("@vinejs/vine");

const transactionSchema = vine.object({
  client: vine.number(),
  amount: vine.number(),
  card_last_numbers: vine.string().fixedLength(4)
});

module.exports = vine.compile(transactionSchema);