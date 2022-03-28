const { getUserById } = require('./../../services/user_service')

async function getUserAuthenticated (req, res) {
  try {
    const user = await getUserById(req.user.id)
    return res.status(200).json(user)
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while updating record' })
  }
}

module.exports = {
  getUserAuthenticated
}
