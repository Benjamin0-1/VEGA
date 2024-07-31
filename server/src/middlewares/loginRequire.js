const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ error: 'No se provee de un token, autorizacion negada' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token invalido, autorizacion negada' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.id;
        req.userEmail = decoded.email
        next();
    } catch (error) {
        return res.status(401).json({ error: 'El token no es valido, no coincide, autorizacion negada.' });
    }
}