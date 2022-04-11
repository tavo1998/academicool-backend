const { isTeacher } = require('../lib/role_validator')
const { isAssignmentOfTeacher } = require('../services/assignment_service')

const canDeleteAssignment = async (req, res, next) => {
  const { assignmentId } = req.params

  if (isTeacher(req.user.role) && await isAssignmentOfTeacher(parseInt(assignmentId), req.user.id)) return next()
  return res.status(403).json({ message: 'Unauthorized user' })
}

module.exports = canDeleteAssignment
