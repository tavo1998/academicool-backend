const { Router } = require('express')
const userController = require('./../../controllers/v1/user_controller')
const checkUserCookie = require('./../../middlewares/check_user_cookie')
const checkIsAuthenticated = require('./../../middlewares/check_is_authenticated')
const canGetUserStudents = require('./../../middlewares/can_get_user_students')

const router = Router()

router.get(
  '/me',
  checkUserCookie,
  checkIsAuthenticated,
  userController.getUserAuthenticated
)

router.get(
  '/students',
  checkUserCookie,
  checkIsAuthenticated,
  canGetUserStudents,
  userController.getUserStudentsController
)

module.exports = router
