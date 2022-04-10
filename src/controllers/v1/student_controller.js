const { getStudentAssistance } = require('../../services/student_service')
const { getSubjectAssignmentsWithStudentScore, getSubjectNotices } = require('../../services/subject_service')
const { getGradeSubjects } = require('./../../services/grade_service')

const getStudentSubjectsController = async (req, res) => {
  try {
    const subjects = await getGradeSubjects(req.student.grade_id)
    return res.status(200).json({ data: subjects })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while fetching records' })
  }
}

const getStudentAssignmentsController = async (req, res) => {
  const { subject, pagination, title } = req.query
  const { studentId } = req.params

  try {
    const assignments = await getSubjectAssignmentsWithStudentScore(parseInt(subject), parseInt(studentId), pagination, title)
    return res.status(200).json({ data: assignments })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while fetching records' })
  }
}

const getStudentNoticesController = async (req, res) => {
  const { subject, pagination, title } = req.query

  try {
    const notices = await getSubjectNotices(parseInt(subject), pagination, title)
    return res.status(200).json({ data: notices })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while fetching records' })
  }
}

const getStudentAssistancesController = async (req, res) => {
  const { subject, date } = req.query
  const { studentId } = req.params

  try {
    const assistance = await getStudentAssistance(parseInt(studentId), parseInt(subject), date)
    return res.status(200).json({ data: assistance })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while fetching records' })
  }
}

module.exports = {
  getStudentSubjectsController,
  getStudentAssignmentsController,
  getStudentNoticesController,
  getStudentAssistancesController
}
