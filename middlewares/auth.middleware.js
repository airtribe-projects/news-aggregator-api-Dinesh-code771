const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const tokenString = token.split(" ")[1];
  const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

module.exports = authMiddleware;
