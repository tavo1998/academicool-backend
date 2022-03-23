const { getGoogleTokens, getUserDetails } = require("../lib/google");
const { checkUserRegister } = require("../services/user_service");

async function checkUserExist(req, res, next) {
  const code = req.query.code;

  try {
    const tokens = await getGoogleTokens(code)
    const userInfo = await getUserDetails(tokens)
    if(!checkUserRegister(userInfo.email)){
      return res.redirect("/login")
    }
    //req.userInfo = userInfo;
    next()
  }catch(e) {
    console.log(e)
    return res.json({ message: "An error occurred while logging in" })
  }
}

module.exports = checkUserExist