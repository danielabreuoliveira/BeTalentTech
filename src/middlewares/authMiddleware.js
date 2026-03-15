const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ mensagem: 'Token não fornecido' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'segredo');
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }
}

module.exports = authMiddleware;