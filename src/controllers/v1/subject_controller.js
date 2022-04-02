const { Role } = require('@prisma/client')
const { getSubjects, getTeacherSubjects } = require('../../services/subject_service')

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

module.exports = {
  getSubjectsController
}
