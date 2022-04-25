const { getUserById, getUserStudents, sendSupportEmail } = require('./../../services/user_service')

async function getUserAuthenticated (req, res) {
  try {
    const user = await getUserById(req.user.id)
    return res.status(200).json(user)
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while updating record' })
  }
}

async function getUserStudentsController (req, res) {
  try {
    const students = await getUserStudents(req.user.id)
    return res.status(200).json({ data: students })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while fetching records' })
  }
}

async function sendSupportEmailController (req, res) {
  try {
    await sendSupportEmail(req.body, req.user)
    return res.status(204).json({})
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while fetching records' })
  }
}

module.exports = {
  getUserAuthenticated,
  getUserStudentsController,
  sendSupportEmailController
}
