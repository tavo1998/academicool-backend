const { Role } = require('@prisma/client')

function checkIsAdminOrTeacher (req, res, next) {
  if (req.user.role === Role.ADMIN || req.user.role === Role.TEACHER) return next()
  return res.status(403).json({ message: 'Unauthorized user' })
}

module.exports = checkIsAdminOrTeacher
