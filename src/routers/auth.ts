import { Router, Request, Response } from "express"
import { getConnectionUrl, getGoogleTokens, getUserDetails } from "./../lib/google";

const router = Router();

router.get("/google", (req: Request, res: Response) => {
  res.redirect(getConnectionUrl());
})

router.get("/google/callback", async (req: Request, res: Response) => {
  const code = req.query.code as string;
  try {
    const tokens = await getGoogleTokens(code)
    const userInfo = await getUserDetails(tokens)
    return res.json({
      userInfo: userInfo.email
    })
  }catch(e) {
    return res.json({
      message: "An error ocurred"
    })
  }
  
})
export default router;