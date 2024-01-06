const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config'); // Importa la clave secreta para firmar los tokens

const verifyAdminToken = (req, res, next) => {
  const token = req.body.token; // Modifica aquí para obtener el token del cuerpo de la solicitud

  // Verifica si el token está presente
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }
  console.log(token)

  try {
    // Verifica el token utilizando la clave secreta
    const decoded = jwt.verify(token, secretKey);

    // Verifica si el usuario tiene el rol de administrador
    if (decoded.rol !== 'ADMIN') {
      return res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador.' });
    }

    // Agrega la información del usuario decodificado al objeto de solicitud
    req.user = decoded;

    // Continúa con la siguiente función en la cadena de middleware
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Token inválido.' });
    
  }
};

module.exports = { verifyAdminToken };
