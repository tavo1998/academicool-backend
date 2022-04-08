const { getGradeStudents } = require('./../../services/grade_service')

const getGradeStudentsController = async (req, res) => {
  const { gradeId } = req.params
  try {
    const students = await getGradeStudents(parseInt(gradeId))
    return res.status(200).json({ data: students })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'An error has occurred while fetching data' })
  }
}

module.exports = {
  getGradeStudentsController
}
