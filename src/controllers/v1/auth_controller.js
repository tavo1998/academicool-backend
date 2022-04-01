const { getConnectionUrl } = require('../../lib/google')
const { createJWT } = require('../../lib/jwt')
const { createOptionsCookie } = require('../../lib/cookies')
const { Role } = require('@prisma/client')

function roleRedirectUrl (role) {
  if (role === Role.ADMIN) return process.env.CLIENT_URL + '/dashboard/admin'
  if (role === Role.ATTENDANT) return process.env.CLIENT_URL + '/dashboard/attendant'
  if (role === Role.TEACHER) return process.env.CLIENT_URL + '/dashboard/teacher'
}

function googleLogin (req, res) {
  return res.redirect(getConnectionUrl())
}

async function googleCallback (req, res) {
  try {
    const jwt = createJWT({ userId: req.user.id })
    res.cookie('user_auth_token', jwt, createOptionsCookie(10))

    return res.redirect(roleRedirectUrl(req.user.role))
  } catch (e) {
    console.log(e)
    return res.json({
      message: 'An error ocurred'
    })
  }
}

module.exports = {
  googleLogin,
  googleCallback
}
