const jwt = require('jsonwebtoken');
const config = require('../config/config');
const fs = require('fs')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const publicKey = fs.readFileSync('/usr/src/app/src/middleware/public.pub', { encoding: 'utf-8', flag: 'r' })
    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    jwt.verify(token, publicKey,{ algorithms: ['RS256'] }, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: 'Token invalide' });
        }
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateToken
};