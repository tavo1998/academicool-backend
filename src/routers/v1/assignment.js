const { Router } = require('express')
const { body } = require('express-validator')
const assignmentController = require('./../../controllers/v1/assignment_controller')
const checkIsAuthenticated = require('../../middlewares/check_is_authenticated')
const checkUserCookie = require('../../middlewares/check_user_cookie')
const canUpdateAssignment = require('../../middlewares/can_update_assignment')
const validateErrors = require('../../middlewares/validate_errors')
const canQualifyAssignments = require('../../middlewares/can_qualify_assignment')
const canDeleteAssignment = require('../../middlewares/can_delete_assignment')

const router = Router()

router.put(
  '/:assignmentId',
  checkUserCookie,
  checkIsAuthenticated,
  canUpdateAssignment,
  body('title').isLength({ max: 100 }).notEmpty().optional(),
  body('description').isLength({ max: 280 }).notEmpty().optional(),
  body('delivery_date').isISO8601().notEmpty().optional(),
  validateErrors,
  assignmentController.updateAssignmentController
)

router.delete(
  '/:assignmentId',
  checkUserCookie,
  checkIsAuthenticated,
  canDeleteAssignment,
  assignmentController.deleteAssignmentController
)

router.post(
  '/:assignmentId/scores',
  checkUserCookie,
  checkIsAuthenticated,
  canQualifyAssignments,
  body().isArray(),
  body('*.student_id').isInt(),
  body('*.value').isDecimal({ force_decimal: false, decimal_digits: 1 }).isFloat({ min: 0, max: 5 }),
  body('*.commentary').isLength({ max: 100 }).optional(),
  validateErrors,
  assignmentController.qualifyAssignmentController
)

router.put(
  '/:assignmentId/scores',
  checkUserCookie,
  checkIsAuthenticated,
  canQualifyAssignments,
  body().isArray(),
  body('*.student_id').isInt(),
  body('*.value').isDecimal({ force_decimal: false, decimal_digits: 1 }).isFloat({ min: 0, max: 5 }),
  body('*.commentary').isLength({ max: 100 }).optional(),
  validateErrors,
  assignmentController.updateAssignmentScoresController
)

router.get(
  '/:assignmentId/scores',
  checkUserCookie,
  checkIsAuthenticated,
  canQualifyAssignments,
  assignmentController.getAssignmentScoresController
)

module.exports = router
