const jwtUtils = require('../app/jwt');

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
      ok: false,
      mensaje: 'Token no proporcionado',
    });
  }

  try {
    const usuario = jwtUtils.verificarToken(token);
    req.usuario = usuario;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({
      ok: false,
      mensaje: 'Token inválido',
    });
  }
};

module.exports = { verificarToken };
