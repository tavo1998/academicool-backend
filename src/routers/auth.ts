import { Router, Request, Response } from "express"

const router = Router();

router.get("/google", (req: Request, res: Response) => {
  console.log("You are going to sign in with google")
  res.json({"message": "Login with Google..."})
})

export default router;