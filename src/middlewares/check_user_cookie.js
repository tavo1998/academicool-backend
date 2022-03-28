const { decodeToken } = require('./../lib/jwt')
const prisma = require('./../config/database')

async function checkUserCookie (req, res, next) {
  const userToken = req.cookies.user_auth_token
  if (!userToken) return next()

  const payload = decodeToken(userToken)
  if (!payload) return next()

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId
      }
    })
    req.user = user
    return next()
  } catch (e) {
    return next()
  }
}

module.exports = checkUserCookie
