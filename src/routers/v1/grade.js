const { Router } = require('express')
const gradeController = require('./../../controllers/v1/grade_controller')
const checkIsAuthenticated = require('../../middlewares/check_is_authenticated')
const checkUserCookie = require('../../middlewares/check_user_cookie')
const canGetGradeStudents = require('../../middlewares/can_get_grade_students')

const router = Router()

router.get(
  '/:gradeId/students',
  checkUserCookie,
  checkIsAuthenticated,
  canGetGradeStudents,
  gradeController.getGradeStudentsController
)

module.exports = router
