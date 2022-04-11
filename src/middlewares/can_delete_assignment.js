const { isTeacher } = require('../lib/role_validator')
const { isAssignmentOfTeacher } = require('../services/assignment_service')

const canDeleteAssignment = async (req, res, next) => {
  const { assignmentId } = req.params

  try {
    if (isTeacher(req.user.role) && isAssignmentOfTeacher(parseInt(assignmentId), req.user.id)) return next()
    return res.status(403).json({ message: 'Unauthorized user' })
  } catch (e) {
    return res.status(500).json({ message: 'An error occurred while processing the request' })
  }
}

module.exports = canDeleteAssignment
