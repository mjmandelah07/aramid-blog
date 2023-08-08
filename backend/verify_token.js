const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); // Add this line
dotenv.config();


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  const secretKey = process.env.SECRET_KEY; 

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
