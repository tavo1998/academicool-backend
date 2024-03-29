const { createAssignment } = require('../../services/assignment_service')
const { createNotice } = require('../../services/notice_service')
const {
  getTeacherSubjects,
  getSubjectAssignments,
  getSubjectNotices,
  getSubjectAssistances,
  postSubjectAssistance
} = require('../../services/subject_service')

const getSubjectsController = async (req, res) => {
  try {
    const subjects = await getTeacherSubjects(req.user.id)
    return res.status(200).json({ data: subjects })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while processing the request' })
  }
}

const getSubjectAssignmentsController = async (req, res) => {
  const { title, pagination } = req.query
  const { subjectId } = req.params

  try {
    const assignments = await getSubjectAssignments(subjectId, pagination, title)
    return res.status(200).json({ data: assignments })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while processing the request' })
  }
}

const postSubjectAssignmentsController = async (req, res) => {
  const { subjectId } = req.params
  req.body.subject = {
    connect: {
      id: parseInt(subjectId)
    }
  }

  try {
    const assignment = await createAssignment(req.body)
    return res.status(201).json({ data: assignment })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while creating record' })
  }
}

const getSubjectNoticesController = async (req, res) => {
  const { title, pagination } = req.query
  const { subjectId } = req.params

  try {
    const notices = await getSubjectNotices(parseInt(subjectId), pagination, title)
    return res.status(200).json({ data: notices })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while get records' })
  }
}

const postSubjectNoticesController = async (req, res) => {
  const { subjectId } = req.params
  req.body.subject = {
    connect: {
      id: parseInt(subjectId)
    }
  }
  try {
    const notice = await createNotice(req.body)
    return res.status(201).json({ data: notice })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while creating record' })
  }
}

const getSubjectAssistancesController = async (req, res) => {
  const { subjectId } = req.params
  const { date } = req.query
  try {
    const assistance = await getSubjectAssistances(parseInt(subjectId), date)
    return res.status(200).json({ data: assistance })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while creating record' })
  }
}

const qualifySubjectAssistanceController = async (req, res) => {
  const { subjectId } = req.params
  try {
    const assistance = await postSubjectAssistance(parseInt(subjectId), req.body)
    return res.status(201).json({ data: assistance })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while creating record' })
  }
}

module.exports = {
  getSubjectsController,
  getSubjectAssignmentsController,
  postSubjectAssignmentsController,
  getSubjectNoticesController,
  postSubjectNoticesController,
  getSubjectAssistancesController,
  qualifySubjectAssistanceController
}
