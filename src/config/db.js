// Importa biblioteca de conexão com MySQL
const mysql = require("mysql2/promise");

// Cria um pool de conexões com o banco
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "payment_system",
  waitForConnections: true,
  connectionLimit: 10
});

// Exporta a conexão para ser usada no projeto
module.exports = pool;