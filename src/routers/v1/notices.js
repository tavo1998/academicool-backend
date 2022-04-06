const { Router } = require('express')
const { body } = require('express-validator')
const noticeController = require('./../../controllers/v1/notice_controller')
const checkIsAuthenticated = require('../../middlewares/check_is_authenticated')
const checkUserCookie = require('../../middlewares/check_user_cookie')
const canUpdateNotice = require('../../middlewares/can_update_notice')
const validateErrors = require('./../../middlewares/validate_errors')

const router = Router()

router.put(
  '/:noticeId',
  checkUserCookie,
  checkIsAuthenticated,
  canUpdateNotice,
  body('title').isLength({ max: 100 }).notEmpty().optional(),
  body('description').isLength({ max: 280 }).notEmpty().optional(),
  validateErrors,
  noticeController.updateNoticeController
)

module.exports = router
