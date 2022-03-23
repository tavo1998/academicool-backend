const jwt = require("jsonwebtoken");

function createJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 5 * 60 });
}

module.exports = {
  createJWT
}