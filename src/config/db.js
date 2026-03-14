// Importa biblioteca mysql2
const mysql = require("mysql2/promise");

/*
Cria um pool de conexões com o banco
Isso melhora a performance da aplicação
*/
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "payment_system"
});

// Exporta conexão
module.exports = pool;