import { NextFunction, Request, Response } from "express";
import { oauth2_v2 } from "googleapis";
import { getGoogleTokens, getUserDetails } from "../lib/google";
import { checkUserRegister } from "../services/user_service";


export default async function checkUserExist(req: Request, res: Response, next: NextFunction) {
  const code = req.query.code as string;

  try {
    const tokens = await getGoogleTokens(code)
    const userInfo = await getUserDetails(tokens)
    if(!checkUserRegister(userInfo.email as string)){
      return res.redirect("/login")
    }
    //req.userInfo = userInfo;
    next()
  }catch(e) {
    console.log(e)
    return res.json({ message: "An error occurred while logging in" })
  }
}