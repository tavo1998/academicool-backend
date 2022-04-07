const { getAssistanceById } = require('../services/assistance_service')

const canUpdateAssistanceStudents = async (req, res, next) => {
  const { assistanceId } = req.params

  try {
    const assistance = await getAssistanceById(parseInt(assistanceId), true)
    if (assistance && assistance.subject.teacher_id === req.user.id) return next()
    return res.status(403).json({ error: 'Unauthorized user' })
  } catch (e) {
    return res.status(500).json({ error: 'An error occurred while accessing while processing the request' })
  }
}

module.exports = canUpdateAssistanceStudents
