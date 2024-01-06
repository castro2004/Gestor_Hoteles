const crypto = require('crypto');

// Genera una cadena aleatoria de 64 bytes (512 bits)
const secretKey = crypto.randomBytes(64).toString('hex');

module.exports = { secretKey };
