const { getGradeById } = require('../services/grade_service')
const { isTeacher } = require('./../lib/role_validator')

const canGetGradeStudents = async (req, res, next) => {
  const { gradeId } = req.params
  try {
    const grade = await getGradeById(parseInt(gradeId))
    if (isTeacher(req.user.role) && (req.user.institution_id === grade.institution_id)) return next()
  } catch (e) {
    return res.status(403).json({ message: 'Unauthorized user' })
  }

  return res.status(403).json({ message: 'Unauthorized user' })
}

module.exports = canGetGradeStudents
