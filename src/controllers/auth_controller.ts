import { Request, Response } from "express";
import { getConnectionUrl, getGoogleTokens, getUserDetails } from "./../lib/google";
import { createJWT } from "./../lib/jwt";
import { createOptionsCookie } from "./../lib/cookies";
 
function googleLogin(req: Request, res: Response) {
  return res.redirect(getConnectionUrl());
}

async function googleCallback(req: Request, res: Response) {
  const code = req.query.code as string;
  try {
    const tokens = await getGoogleTokens(code)
    const userInfo = await getUserDetails(tokens)
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

export default {
  googleLogin,
  googleCallback
}