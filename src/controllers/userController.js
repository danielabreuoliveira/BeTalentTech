const db = require('../database/connection');
const bcrypt = require('bcryptjs');

/**
 * Cria um novo usuário
 */
async function createUser(req, res) {
  try {
    const { email, password, role } = req.body;

    // Validação básica
    if (!email || !password || !role) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }

    // Verifica se o email já está cadastrado
    const existing = await db('users').where({ email }).first();
    if (existing) {
      return res.status(400).json({ mensagem: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 8);

    // Insere o usuário no banco
    const [userId] = await db('users').insert({
      email,
      password: hashedPassword,
      role
    });

    // Busca o usuário recém-criado
    const user = await db('users').where({ id: userId }).first();

    return res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      user
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao criar usuário',
      erro: error.message
    });
  }
}

module.exports = { createUser };