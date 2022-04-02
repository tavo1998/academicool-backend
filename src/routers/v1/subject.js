const { Router } = require('express')
const checkIsAdminOrTeacher = require('../../middlewares/check_is_admin_or_teacher')
const checkIsAuthenticated = require('../../middlewares/check_is_authenticated')
const checkUserCookie = require('../../middlewares/check_user_cookie')
const subjectController = require('./../../controllers/v1/subject_controller')

const router = Router()

router.get(
  '/',
  checkUserCookie,
  checkIsAuthenticated,
  checkIsAdminOrTeacher,
  subjectController.getSubjectsController
)

module.exports = router
