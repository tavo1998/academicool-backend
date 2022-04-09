const { Router } = require('express')
const studentController = require('./../../controllers/v1/student_controller')
const checkIsAuthenticated = require('../../middlewares/check_is_authenticated')
const checkUserCookie = require('../../middlewares/check_user_cookie')
const canGetStudentSubjects = require('../../middlewares/can_get_student_subjects')

const router = Router()

router.get(
  '/:studentId/subjects',
  checkUserCookie,
  checkIsAuthenticated,
  canGetStudentSubjects,
  studentController.getStudentSubjectsController
)

module.exports = router
