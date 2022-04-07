const { getGradeById } = require('../services/grade_service')
const { isTeacher } = require('./../lib/role_validator')

const canGetGradeStudents = async (req, res, next) => {
  const { gradeId } = req.params
  try {
    const grade = await getGradeById(parseInt(gradeId))
    if (isTeacher(req.user.role) && (req.user.institution_id === grade.institution_id)) return next()
    return res.status(403).json({ message: 'Unauthorized user' })
  } catch (e) {
    return res.status(500).json({ message: 'An error occurred while processing the request' })
  }
}

module.exports = canGetGradeStudents
