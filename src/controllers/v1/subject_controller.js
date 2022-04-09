const { Role } = require('@prisma/client')
const { createAssignment } = require('../../services/assignment_service')
const { createNotice } = require('../../services/notice_service')
const {
  getSubjects,
  getTeacherSubjects,
  getSubjectAssignments,
  getSubjectNotices,
  getSubjectAssistances,
  postSubjectAssistance,
  filterSubjectAssignmentsByTitle,
  filterSubjectNoticesByTitle
} = require('../../services/subject_service')

const getSubjectsController = async (req, res) => {
  let subjects
  try {
    if (req.user.role === Role.ADMIN) {
      subjects = await getSubjects()
    } else {
      subjects = await getTeacherSubjects(req.user.id)
    }
    return res.status(200).json({ data: subjects })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while processing the request' })
  }
}

const getSubjectAssignmentsController = async (req, res) => {
  const { title } = req.query
  const { subjectId } = req.params
  let assignments

  try {
    if (title) assignments = await filterSubjectAssignmentsByTitle(subjectId, title)
    else assignments = await getSubjectAssignments(subjectId)
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
  const { title } = req.query
  const { subjectId } = req.params
  let notices

  try {
    if (title) notices = await filterSubjectNoticesByTitle(parseInt(subjectId), title)
    else notices = await getSubjectNotices(parseInt(subjectId))
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
