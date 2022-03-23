const { Router, Request, Response } =  require("express");
const authController = require("../../controllers/v1/auth_controller");
const checkUserExist = require("../../middlewares/check_user_exist");

const router = Router();

router.get("/google", authController.googleLogin)
router.get("/google/callback", authController.googleCallback)


module.exports = router;