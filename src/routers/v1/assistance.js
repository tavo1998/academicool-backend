const { Router } = require('express')
const { body } = require('express-validator')
const assistanceController = require('./../../controllers/v1/assistance_controller')
const checkIsAuthenticated = require('../../middlewares/check_is_authenticated')
const checkUserCookie = require('../../middlewares/check_user_cookie')
const validateErrors = require('../../middlewares/validate_errors')
const canUpdateAssistanceStudents = require('../../middlewares/can_update_assistance_students')

const router = Router()

router.put(
  '/:assistanceId/students',
  checkUserCookie,
  checkIsAuthenticated,
  canUpdateAssistanceStudents,
  body().isArray(),
  body('*.student_id').isInt(),
  body('*.attended').isBoolean(),
  validateErrors,
  assistanceController.updateAssistanceStudentsController
)

module.exports = router
