const { getGradeSubjects } = require('./../../services/grade_service')

const getStudentSubjectsController = async (req, res) => {
  try {
    const subjects = await getGradeSubjects(req.student.grade_id)
    return res.status(200).json({ data: subjects })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while fetching records' })
  }
}

module.exports = {
  getStudentSubjectsController
}
