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
      },
      include: {
        grade: true
      }
    })
    return subjects
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getSubjectAssignments = async (subjectId, pagination, title) => {
  try {
    const assignments = prisma.assigment.findMany({
      skip: pagination * 4,
      take: 4,
      where: {
        subject_id: parseInt(subjectId),
        title: {
          contains: title,
          mode: 'insensitive'
        }
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

const getSubjectNotices = async (subjectId, pagination, title) => {
  try {
    const notices = await prisma.notice.findMany({
      skip: pagination * 4,
      take: 4,
      where: {
        subject_id: subjectId
      },
      title: {
        contains: title,
        mode: 'insensitive'
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

const getSubjectAssistances = async (subjectId, date) => {
  try {
    const assistance = await prisma.assistance.findUnique({
      where: {
        date_subject_id: {
          subject_id: subjectId,
          date: new Date(date)
        }
      },
      include: {
        students: {
          select: {
            attended: true,
            student: {
              select: {
                id: true,
                first_name: true,
                last_name: true
              }
            }
          },
          orderBy: [
            {
              student: {
                first_name: 'asc'
              }
            },
            {
              student: {
                last_name: 'asc'
              }
            }
          ]
        }
      }
    })
    return assistance
  } catch (e) {
    console.log(e)
    throw e
  }
}

const transformAssistancesToPost = (assistances) => {
  return assistances.map(assistance => ({
    attended: assistance.attended,
    student: {
      connect: {
        id: assistance.student_id
      }
    }
  }))
}

const postSubjectAssistance = async (subjectId, data) => {
  try {
    const assistance = await prisma.assistance.create({
      data: {
        description: data.description,
        date: new Date(),
        subject: {
          connect: {
            id: subjectId
          }
        },
        students: {
          create: transformAssistancesToPost(data.assistances)
        }
      }
    })
    return assistance
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getSubjectAssignmentsWithStudentScore = async (subjectId, studentId, pagination, title) => {
  try {
    const assignments = await prisma.assigment.findMany({
      skip: pagination * 4,
      take: 4,
      where: {
        subject_id: subjectId,
        title: {
          contains: title,
          mode: 'insensitive'
        }
      },
      include: {
        scores: {
          where: {
            student_id: studentId
          },
          select: {
            score: true
          }
        }
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

module.exports = {
  getSubjects,
  getTeacherSubjects,
  isTeacherOfSubject,
  getSubjectAssignments,
  getSubjectNotices,
  getSubjectAssistances,
  postSubjectAssistance,
  getSubjectAssignmentsWithStudentScore
}
