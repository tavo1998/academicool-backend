const { getConnectionUrl, getGoogleTokens, getUserDetails } = require("../../lib/google");
const { createJWT } = require("../../lib/jwt");
const { createOptionsCookie } = require("../../lib/cookies");
const { checkUserRegister } = require("../../services/user_service");
 
function googleLogin(req, res) {
  return res.redirect(getConnectionUrl());
}

async function googleCallback(req, res) {
  const code = req.query.code;
  try {
    const tokens = await getGoogleTokens(code)
    const userInfo = await getUserDetails(tokens)
    if(!checkUserRegister(userInfo.email)){
      return res.redirect("/")
    }
    const jwt = createJWT({ user_id: 5 });
    res.cookie("user_auth_token", jwt, createOptionsCookie(1));
    return res.redirect("/")
  }catch(e) {
    console.log(e)
    return res.json({
      message: "An error ocurred"
    })
  }
}

module.exports = {
  googleLogin,
  googleCallback
}