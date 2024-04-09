const jwt = require('jsonwebtoken');
const config = require('../config/auth');

function generateToken(user) {
    return jwt.sign(user, config.jwtSecret, { expiresIn: '24h' }); // 24h hour till expires
}

// JWT token authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing.' });
    }

    jwt.verify(token, config.jwtSecret, (error, user) => {
        if (error) {
            return res.status(403).json({ message: 'Invalid authorization token.' });
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken, generateToken };
