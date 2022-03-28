const { Router } = require('express')
const userController = require('./../../controllers/v1/user_controller')
const checkUserCookie = require('./../../middlewares/check_user_cookie')
const checkIsAuthenticated = require('./../../middlewares/check_is_authenticated')

const router = Router()

router.get('/me', checkUserCookie, checkIsAuthenticated, userController.getUserAuthenticated)

module.exports = router
