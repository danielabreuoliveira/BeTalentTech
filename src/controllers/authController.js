const db = require('../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'segredo123'; // apenas exemplo

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
    }

    const user = await db('users').where({ email }).first();
    if (!user) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ mensagem: 'Senha incorreta' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ mensagem: 'Login realizado', token });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao fazer login', erro: error.message });
  }
}

module.exports = { login };