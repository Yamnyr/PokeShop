const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "Invalid Authorization header",
            details: "Token must be provided with 'Bearer ' prefix"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            username: decoded.username  // Optional: include more user details if needed
        };
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).json({
            message: "Authentication failed",
            details: error.message
        });
    }
};

module.exports = authMiddleware;