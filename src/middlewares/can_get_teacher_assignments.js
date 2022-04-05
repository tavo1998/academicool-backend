const { isTeacherOfSubject } = require('../services/subject_service')

const canGetTeacherAssignments = async (req, res, next) => {
  const { subjectId } = req.params

  const isTeacher = await isTeacherOfSubject(subjectId, req.user.id)

  if (isTeacher) return next()
  else return res.status(403).json({ message: 'Unauthorized user' })
}

module.exports = canGetTeacherAssignments
