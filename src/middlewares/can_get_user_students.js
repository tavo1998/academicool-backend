const { isAttendant } = require('../lib/role_validator')

const canGetUserStudents = (req, res, next) => {
  if (isAttendant(req.user.role)) return next()
  return res.status(403).json({ error: 'Unauthorized user' })
}

module.exports = canGetUserStudents
