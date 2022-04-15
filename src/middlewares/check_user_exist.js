const { getGoogleTokens, getUserDetails } = require('../lib/google')
const { getUserByEmail } = require('../services/user_service')

async function checkUserExist (req, res, next) {
  const code = req.query.code
  const errorMessage = 'Ocurrió un error al iniciar sesión, comunícate con soporte'

  try {
    const tokens = await getGoogleTokens(code)
    const userInfo = await getUserDetails(tokens)
    const user = await getUserByEmail(userInfo.email)
    if (!user || !user.is_active) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=${errorMessage}`)
    }
    req.userInfo = userInfo
    req.user = user
    next()
  } catch (e) {
    console.log(e)
    return res.json({ message: 'An error occurred while logging in' })
  }
}

module.exports = checkUserExist
