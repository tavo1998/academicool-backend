const { getGoogleTokens, getUserDetails } = require("../lib/google");
const { checkUserRegister } = require("../services/user_service");

async function checkUserExist(req, res, next) {
  const code = req.query.code;
  const errorMessage = "Ocurrió un error al iniciar sesión, comunícate con soporte"

  try {
    const tokens = await getGoogleTokens(code)
    const userInfo = await getUserDetails(tokens)
    const user = await checkUserRegister(userInfo.email)
    if(!user){
      return res.redirect(`/login?error=${errorMessage}`)
    }
    req.userInfo = userInfo;
    req.userId = user.id
    next()
  }catch(e) {
    console.log(e)
    return res.json({ message: "An error occurred while logging in" })
  }
}

module.exports = checkUserExist