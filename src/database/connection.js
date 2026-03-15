const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'payment_system'
  }
});

module.exports = db;