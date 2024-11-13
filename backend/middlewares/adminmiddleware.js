const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.jwt_secret || 'mysecretvalue';

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authorization token missing or malformed' });
    }

    // Extract the token from the "Bearer <token>" format
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);  // Log error details
        res.status(403).json({ success: false, message: 'Token is invalid or expired' });
    }
};
