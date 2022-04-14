const { isTeacher } = require('../lib/role_validator')

function canGetSubjects (req, res, next) {
  if (isTeacher(req.user.role)) return next()
  return res.status(403).json({ message: 'Unauthorized user' })
}

module.exports = canGetSubjects
