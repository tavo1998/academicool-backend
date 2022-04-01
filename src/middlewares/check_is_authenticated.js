function checkIsAuthenticated (req, res, next) {
  if (!req.user) return res.status(401).json({ message: 'Unauthenticated user' })
  return next()
}

module.exports = checkIsAuthenticated
