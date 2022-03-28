const { Router } = require('express')
const { body } = require('express-validator')
const checkUserCookie = require('./../../middlewares/check_user_cookie')
const checkIsAdmin = require('./../../middlewares/check_is_admin')
const institutionController = require('../../controllers/v1/institution_controller')

const router = Router()

router.get(
  '/',
  checkUserCookie,
  checkIsAdmin,
  institutionController.getInstitutionsController
)

router.post(
  '/',
  checkUserCookie,
  checkIsAdmin,
  body('name').isLength({ max: 100 }).notEmpty(),
  body('mision').isLength({ max: 280 }).notEmpty().optional(),
  body('vision').isLength({ max: 280 }).notEmpty().optional(),
  body('address').isLength({ max: 100 }).notEmpty(),
  institutionController.createInstitutionController)

router.put('/:id',
  checkUserCookie,
  checkIsAdmin,
  body('name').isLength({ max: 100 }).notEmpty().optional(),
  body('mision').isLength({ max: 280 }).notEmpty().optional(),
  body('vision').isLength({ max: 280 }).notEmpty().optional(),
  body('address').isLength({ max: 100 }).notEmpty().optional(),
  institutionController.updateInstitutionController)

router.delete(
  '/:id',
  checkUserCookie,
  checkIsAdmin,
  institutionController.deleteInstitutionController
)

module.exports = router
