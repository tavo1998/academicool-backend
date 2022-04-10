const { getStudentById } = require('../services/student_service')

const canGetStudentSubjects = async (req, res, next) => {
  const { studentId } = req.params
  try {
    const student = await getStudentById(parseInt(studentId))
    if (student && student.attendant_id === req.user.id) {
      req.student = student
      return next()
    }
    return res.status(403).json({ message: 'Unauthorized user' })
  } catch (e) {
    return res.status(500).json({ message: 'An error occurred while processing the request' })
  }
}

module.exports = canGetStudentSubjects
