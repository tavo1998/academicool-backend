const { Router } = require('express')
const { body } = require('express-validator')
const canGetSubjects = require('../../middlewares/can_get_subjects')
const checkIsAuthenticated = require('../../middlewares/check_is_authenticated')
const checkUserCookie = require('../../middlewares/check_user_cookie')
const canGetTeacherAssignments = require('../../middlewares/can_get_teacher_assignments')
const subjectController = require('./../../controllers/v1/subject_controller')
const validateErros = require('../../middlewares/validate_errors')

const router = Router()

router.get(
  '/',
  checkUserCookie,
  checkIsAuthenticated,
  canGetSubjects,
  subjectController.getSubjectsController
)

router.get(
  '/:subjectId/assignments',
  checkUserCookie,
  checkIsAuthenticated,
  canGetTeacherAssignments,
  subjectController.getSubjectAssignmentsController
)

router.post(
  '/:subjectId/assignments',
  checkUserCookie,
  checkIsAuthenticated,
  canGetTeacherAssignments,
  body('title').isLength({ max: 100 }).notEmpty(),
  body('description').isLength({ max: 280 }).notEmpty(),
  body('delivery_date').isISO8601(),
  validateErros,
  subjectController.postSubjectAssignmentsController
)

module.exports = router
