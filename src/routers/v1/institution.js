const { Router } = require('express')
const { body } = require('express-validator')
const institutionController = require('../../controllers/v1/institution_controller')

const router = Router()

router.get('/', institutionController.getInstitutionsController)
router.post(
  '/',
  body('name').isLength({ max: 100 }).notEmpty(),
  body('mision').isLength({ max: 280 }).notEmpty().optional(),
  body('vision').isLength({ max: 280 }).notEmpty().optional(),
  body('address').isLength({ max: 100 }).notEmpty(),
  institutionController.createInstitutionController)

router.put('/:id',
  body('name').isLength({ max: 100 }).notEmpty().optional(),
  body('mision').isLength({ max: 280 }).notEmpty().optional(),
  body('vision').isLength({ max: 280 }).notEmpty().optional(),
  body('address').isLength({ max: 100 }).notEmpty().optional(),
  institutionController.updateInstitutionController)

router.delete('/:id', institutionController.deleteInstitutionController)

module.exports = router
