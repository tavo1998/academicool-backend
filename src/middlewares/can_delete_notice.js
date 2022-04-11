const { isTeacher } = require('../lib/role_validator')
const { isNoticeOfTeacher } = require('../services/notice_service')

const canDeleteNotice = async (req, res, next) => {
  const { noticeId } = req.params

  if (isTeacher(req.user.role) && await isNoticeOfTeacher(parseInt(noticeId), req.user.id)) return next()
  return res.status(403).json({ message: 'Unauthorized user' })
}

module.exports = canDeleteNotice
