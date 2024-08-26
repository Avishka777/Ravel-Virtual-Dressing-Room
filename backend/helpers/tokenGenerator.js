const jwt = require('jsonwebtoken');
const {JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRE, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRE} = process.env

const generateAccessToken = (user) => {
    return jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      JWT_ACCESS_SECRET,
      { expiresIn: JWT_ACCESS_EXPIRE }  // short-lived access token
    );
  };

  const generateRefreshToken = (user) => {
    return jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      JWT_REFRESH_SECRET,
      { expiresIn: JWT_REFRESH_EXPIRE }  // longer-lived refresh token
    );
  };
  

  module.exports = { generateAccessToken, generateRefreshToken };