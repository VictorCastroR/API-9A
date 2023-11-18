const jwt = require('jsonwebtoken');

const secretKey = 'EquipoMaravilla123'; 

function generarToken(usuario) {
  const payload = {
    usuarioId: usuario.id,
    correoElectronico: usuario.correo_electronico,
  };

  const options = {
    expiresIn: '1h', 
  };

  return jwt.sign(payload, secretKey, options);
}

function verificarToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
}

module.exports = {
  generarToken,
  verificarToken,
};
