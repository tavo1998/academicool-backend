const { getAssignmentById } = require('../services/assignment_service')

const canQualifyAssignments = async (req, res, next) => {
  const { assignmentId } = req.params
  try {
    const assigment = await getAssignmentById(parseInt(assignmentId), true)
    if (assigment?.subject.teacher_id === req.user.id) return next()
    return res.status(403).json({ message: 'Unauthorized user' })
  } catch (e) {
    return res.status(500).json({ message: 'An error occurred while processing the request' })
  }
}

module.exports = canQualifyAssignments
