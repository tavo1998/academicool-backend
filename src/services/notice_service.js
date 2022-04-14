const prisma = require('./../config/database')

const getNoticeById = async (id, includeSubject = false) => {
  try {
    const assignment = await prisma.notice.findUnique({
      where: {
        id
      },
      include: {
        subject: includeSubject
      }
    })
    return assignment
  } catch (e) {
    console.log(e)
    throw e
  }
}

const createNotice = async (data) => {
  try {
    const notice = await prisma.notice.create({
      data
    })
    return notice
  } catch (e) {
    console.log(e)
    throw e
  }
}

const updateNotice = async (id, data) => {
  try {
    const updatedNotice = await prisma.notice.update({
      where: {
        id
      },
      data: data
    })
    return updatedNotice
  } catch (e) {
    console.log(e)
    throw e
  }
}

const desactivateNoticeById = async (id) => {
  try {
    const noticeDeleted = await prisma.notice.update({
      where: {
        id
      },
      data: {
        is_active: false
      }
    })
    return noticeDeleted
  } catch (e) {
    console.log(e)
    throw e
  }
}

const isNoticeOfTeacher = async (noticeId, userId) => {
  try {
    const notice = await getNoticeById(noticeId, true)
    if (!notice) return false
    return notice.subject.teacher_id === userId
  } catch (e) {
    console.log(e)
    return false
  }
}

module.exports = {
  createNotice,
  updateNotice,
  getNoticeById,
  isNoticeOfTeacher,
  desactivateNoticeById
}
