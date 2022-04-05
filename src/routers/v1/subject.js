const { Router } = require('express')
const { body } = require('express-validator')
const checkIsAdminOrTeacher = require('../../middlewares/check_is_admin_or_teacher')
const checkIsAuthenticated = require('../../middlewares/check_is_authenticated')
const checkUserCookie = require('../../middlewares/check_user_cookie')
const checkIsTeacherOfSubject = require('../../middlewares/check_is_teacher_of_subject')
const subjectController = require('./../../controllers/v1/subject_controller')
const validateErros = require('../../middlewares/validate_errors')

const router = Router()

router.get(
  '/',
  checkUserCookie,
  checkIsAuthenticated,
  checkIsAdminOrTeacher,
  subjectController.getSubjectsController
)

router.get(
  '/:subjectId/assignments',
  checkUserCookie,
  checkIsAuthenticated,
  checkIsTeacherOfSubject,
  subjectController.getSubjectAssignmentsController
)

router.post(
  '/:subjectId/assignments',
  checkUserCookie,
  checkIsAuthenticated,
  checkIsTeacherOfSubject,
  body('title').isLength({ max: 100 }).notEmpty(),
  body('description').isLength({ max: 280 }).notEmpty(),
  body('delivery_date').isISO8601(),
  validateErros,
  subjectController.postSubjectAssignmentsController
)

module.exports = router
