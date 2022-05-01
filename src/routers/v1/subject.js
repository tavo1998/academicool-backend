const { Router } = require('express')
const { body, query } = require('express-validator')
const { AssignmentType } = require('@prisma/client')
const canGetSubjects = require('../../middlewares/can_get_subjects')
const checkIsAuthenticated = require('../../middlewares/check_is_authenticated')
const checkUserCookie = require('../../middlewares/check_user_cookie')
const canGetTeacherAssignments = require('../../middlewares/can_get_teacher_assignments')
const subjectController = require('./../../controllers/v1/subject_controller')
const validateErrors = require('../../middlewares/validate_errors')

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
  query('pagination').isInt({ gt: -1 }).withMessage('Pagination must be greater than or equal to 0'),
  validateErrors,
  subjectController.getSubjectAssignmentsController
)

router.post(
  '/:subjectId/assignments',
  checkUserCookie,
  checkIsAuthenticated,
  canGetTeacherAssignments,
  body('title').isLength({ max: 100 }).notEmpty(),
  body('description').isLength({ max: 280 }).notEmpty(),
  body('assignment_type').isIn([
    AssignmentType.EXAM,
    AssignmentType.HOMEWORK,
    AssignmentType.LECTURE,
    AssignmentType.PARTICIPATION,
    AssignmentType.WORKSHOP,
    AssignmentType.QUIZ,
    AssignmentType.PROJECT
  ]),
  body('delivery_date').isISO8601(),
  validateErrors,
  subjectController.postSubjectAssignmentsController
)

router.get(
  '/:subjectId/notices',
  checkUserCookie,
  checkIsAuthenticated,
  canGetTeacherAssignments,
  query('pagination').isInt({ gt: -1 }).withMessage('Pagination must be greater than or equal to 0'),
  validateErrors,
  subjectController.getSubjectNoticesController
)

router.post(
  '/:subjectId/notices',
  checkUserCookie,
  checkIsAuthenticated,
  canGetTeacherAssignments,
  body('title').isLength({ max: 100 }).notEmpty(),
  body('description').isLength({ max: 280 }).notEmpty(),
  validateErrors,
  subjectController.postSubjectNoticesController
)

router.get(
  '/:subjectId/assistances',
  checkUserCookie,
  checkIsAuthenticated,
  canGetTeacherAssignments,
  query('date', 'You must provide the query parameter date')
    .isISO8601('probando')
    .withMessage('The date must be in ISO8601 format'),
  validateErrors,
  subjectController.getSubjectAssistancesController
)

router.post(
  '/:subjectId/assistances',
  checkUserCookie,
  checkIsAuthenticated,
  canGetTeacherAssignments,
  body('description', 'You must provide a description')
    .notEmpty()
    .isLength({ max: 280 })
    .withMessage('The description must have a maximum of 280 characters'),
  body('date').isISO8601(),
  body('assistances').isArray(),
  body('assistances.*.student_id', 'assistance must have student id').isInt(),
  body('assistances.*.attended', 'assistance must have attended status').isBoolean(),
  validateErrors,
  subjectController.qualifySubjectAssistanceController
)

module.exports = router
