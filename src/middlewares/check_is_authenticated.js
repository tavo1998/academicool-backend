function checkIsAuthenticated (req, res, next) {
  if (!req.user || !req.user.is_active) return res.status(401).json({ message: 'Unauthenticated user' })
  return next()
}

module.exports = checkIsAuthenticated
