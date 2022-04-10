const { Router } = require('express')
const { query } = require('express-validator')
const studentController = require('./../../controllers/v1/student_controller')
const checkIsAuthenticated = require('../../middlewares/check_is_authenticated')
const checkUserCookie = require('../../middlewares/check_user_cookie')
const canGetStudentSubjects = require('../../middlewares/can_get_student_subjects')
const validateErrors = require('../../middlewares/validate_errors')

const router = Router()

router.get(
  '/:studentId/subjects',
  checkUserCookie,
  checkIsAuthenticated,
  canGetStudentSubjects,
  studentController.getStudentSubjectsController
)

router.get(
  '/:studentId/assignments',
  checkUserCookie,
  checkIsAuthenticated,
  canGetStudentSubjects,
  query('pagination').isInt({ gt: -1 }).withMessage('Pagination must be greater than or equal to 0'),
  validateErrors,
  studentController.getStudentAssignmentsController
)

module.exports = router
