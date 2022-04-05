const { isNoticeOfTeacher } = require('../services/notice_service')
const { isAdmin } = require('./../lib/role_validator')

const canUpdateNotice = async (req, res, next) => {
  const { noticeId } = req.params

  const noticeOfTeacher = await isNoticeOfTeacher(parseInt(noticeId), req.user.id)

  if (noticeOfTeacher || isAdmin(req.user.role)) return next()
  else return res.status(403).json({ message: 'Unauthorized user' })
}

module.exports = canUpdateNotice
