const { isAdmin, isTeacher } = require('../lib/role_validator')

function canGetSubjects (req, res, next) {
  if (isAdmin(req.user.role) || isTeacher(req.user.role)) return next()
  return res.status(403).json({ message: 'Unauthorized user' })
}

module.exports = canGetSubjects
