const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv=require('dotenv');
dotenv.config();

async function authMiddleware(req, res, next) {
  const token = req.header('Authorization');
  console.log("Received Token:", token);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
 
  const tokenParts = token.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const actualToken = tokenParts[1];

  try {
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const user = await User.findByPk(decoded.userId);


    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = authMiddleware;
