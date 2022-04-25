const { Router } = require('express')
const { body } = require('express-validator')
const userController = require('./../../controllers/v1/user_controller')
const checkUserCookie = require('./../../middlewares/check_user_cookie')
const checkIsAuthenticated = require('./../../middlewares/check_is_authenticated')
const canGetUserStudents = require('./../../middlewares/can_get_user_students')
const validateErrors = require('./../../middlewares/validate_errors')

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

router.post(
  '/support-email',
  checkUserCookie,
  checkIsAuthenticated,
  body('title')
    .notEmpty().withMessage('This field is mandatory')
    .isLength({ max: 100 }).withMessage('Title must have 100 or less characters'),
  body('description')
    .notEmpty().withMessage('This field is mandatory')
    .isLength({ max: 560 }).withMessage('Title must have 560 or less characters'),
  validateErrors,
  userController.sendSupportEmailController
)

module.exports = router
