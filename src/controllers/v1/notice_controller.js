const { updateNotice } = require('../../services/notice_service')

const updateNoticeController = async (req, res) => {
  const { noticeId } = req.params

  try {
    const notice = await updateNotice(parseInt(noticeId), req.body)
    return res.status(200).json({ data: notice })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while updating record' })
  }
}

module.exports = {
  updateNoticeController
}
