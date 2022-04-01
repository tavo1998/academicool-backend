const { Role } = require('@prisma/client')

function checkIsAdmin (req, res, next) {
  if (req.user.role !== Role.ADMIN) return res.status(403).json({ message: 'Unauthorized user' })

  return next()
}

module.exports = checkIsAdmin
