const jwt = require('jsonwebtoken')

function createJWT (payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 5 * 60 })
}

function decodeToken (token) {
  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
    return decodedPayload
  } catch (e) {
    return false
  }
}

module.exports = {
  createJWT,
  decodeToken
}
