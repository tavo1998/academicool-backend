function checkIsAuthenticated (req, res, next) {
  if (!req.user) return res.status(403).json({ message: 'Unauthorized user' })
  return next()
}

module.exports = checkIsAuthenticated
