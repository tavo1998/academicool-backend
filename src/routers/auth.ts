import { Router, Request, Response } from "express"
import authController from "./../controllers/auth_controller";

const router = Router();

router.get("/google", authController.googleLogin)
router.get("/google/callback", authController.googleCallback)


export default router;