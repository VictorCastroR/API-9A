const jwt = require('jsonwebtoken');
const palabraS = 'MilyValeVerga'


// Función para generar un token JWT
function generateToken(payload) {
    const token = jwt.sign(payload, palabraS, { expiresIn: '24h' });
    return token;
}

// Middleware para verificar y validar un token JWT
function verifyToken(req, res, next) {
    // Obtener el token de la cabecera de la solicitud
    const token = req.headers['authorization'];

    // Verificar si el token existe
    if (!token) {
        return res.status(401).json({ message: 'Token de autorización no proporcionado' });
    }

    // Verificar y decodificar el token JWT
    jwt.verify(token, palabraS, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token de autorización inválido' });
        }

        // Si el token es válido, adjuntar los datos decodificados a la solicitud para su uso posterior
        req.user = decoded;
        next();
    });
}

module.exports = {
    generateToken,
    verifyToken
};