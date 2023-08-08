const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); // Add this line
dotenv.config();


const generateToken = (payload) => {
  const secretKey = process.env.SECRET_KEY; 
  const options = { expiresIn: '20m' }; // Token expiration time

  return jwt.sign(payload, secretKey, options);
};

module.exports = generateToken;
