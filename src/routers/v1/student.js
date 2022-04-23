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
  query('subject').isInt({ gt: 0 }).withMessage('Subject ID must be greater than or equal to 1'),
  validateErrors,
  studentController.getStudentAssignmentsController
)

router.get(
  '/:studentId/notices',
  checkUserCookie,
  checkIsAuthenticated,
  canGetStudentSubjects,
  query('pagination').isInt({ gt: -1 }).withMessage('Pagination must be greater than or equal to 0'),
  query('subject').isInt({ gt: 0 }).withMessage('Subject ID must be greater than or equal to 1'),
  validateErrors,
  studentController.getStudentNoticesController
)

router.get(
  '/:studentId/assistances',
  checkUserCookie,
  checkIsAuthenticated,
  canGetStudentSubjects,
  query('subject').isInt({ gt: 0 }).withMessage('subject ID must be greater than or equal to 1'),
  query('date').isISO8601().withMessage('Date must be in ISO8601 format'),
  validateErrors,
  studentController.getStudentAssistancesController
)

router.get(
  '/:studentId/score-average',
  checkUserCookie,
  checkIsAuthenticated,
  canGetStudentSubjects,
  query('subject').isInt({ gt: 0 }).withMessage('subject ID must be greater than or equal to 1'),
  validateErrors,
  studentController.getSubjectScoreAverageController
)

router.get(
  '/:studentId/assistance-score',
  checkUserCookie,
  checkIsAuthenticated,
  canGetStudentSubjects,
  query('subject').isInt({ gt: 0 }).withMessage('subject ID must be greater than or equal to 1'),
  validateErrors,
  studentController.getSubjectAssistanceScoreController
)

module.exports = router
