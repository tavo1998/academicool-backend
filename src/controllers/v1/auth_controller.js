const { getConnectionUrl } = require("../../lib/google");
const { createJWT } = require("../../lib/jwt");
const { createOptionsCookie } = require("../../lib/cookies");
 
function googleLogin(req, res) {
  return res.redirect(getConnectionUrl());
}

async function googleCallback(req, res) {
  try {
    const jwt = createJWT({ userId: req.userId });
    res.cookie("user_auth_token", jwt, createOptionsCookie(1));
    return res.redirect(`${process.env.CLIENT_URL}/`)
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