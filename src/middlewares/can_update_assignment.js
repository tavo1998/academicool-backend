const { isAssignmentOfTeacher } = require('../services/assignment_service')
const { isAdmin } = require('./../lib/role_validator')

const canUpdateAssignment = async (req, res, next) => {
  const { assignmentId } = req.params

  const assignmentOfTeacher = await isAssignmentOfTeacher(parseInt(assignmentId), req.user.id)

  if (assignmentOfTeacher || isAdmin(req.user.role)) return next()
  else return res.status(403).json({ message: 'Unauthorized user' })
}

module.exports = canUpdateAssignment
