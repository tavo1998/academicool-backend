const prisma = require('./../config/database')

const getSubjects = async () => {
  try {
    const subjects = await prisma.subject.findMany()
    return subjects
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getTeacherSubjects = async (teacherId) => {
  try {
    const subjects = await prisma.subject.findMany({
      where: {
        teacher_id: teacherId
      }
    })
    return subjects
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getSubjectAssignments = async (subjectId) => {
  try {
    const assignments = prisma.assigment.findMany({
      where: {
        subject_id: parseInt(subjectId)
      },
      orderBy: {
        id: 'desc'
      }
    })
    return assignments
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getSubjectNotices = async (subjectId) => {
  try {
    const notices = await prisma.notice.findMany({
      where: {
        subject_id: subjectId
      },
      orderBy: {
        id: 'desc'
      }
    })
    return notices
  } catch (e) {
    console.log(e)
    throw e
  }
}

const isTeacherOfSubject = async (subjectId, userId) => {
  try {
    const subject = await prisma.subject.findUnique({
      where: {
        id: parseInt(subjectId)
      }
    })

    if (!subject) return false

    return subject.teacher_id === userId
  } catch (e) {
    return false
  }
}

module.exports = {
  getSubjects,
  getTeacherSubjects,
  isTeacherOfSubject,
  getSubjectAssignments,
  getSubjectNotices
}
