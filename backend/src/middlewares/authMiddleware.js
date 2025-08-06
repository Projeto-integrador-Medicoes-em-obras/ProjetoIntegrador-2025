import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Aqui garantimos que o user está sendo salvo corretamente
    console.log("Token decodificado:", decoded);

    req.user = decoded; // Agora o user.id estará disponível
    next();
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    return res.status(403).json({ error: 'Token inválido' });
  }
}

