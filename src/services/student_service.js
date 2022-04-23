const { ASSIGNMENT_TYPE_LIST } = require('../lib/assignment')
const prisma = require('./../config/database')

const getStudentById = async (id) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        id
      }
    })
    return student
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getStudentAssistance = async (studentId, subjectId, date) => {
  try {
    const assistance = await prisma.studentAssistance.findFirst({
      where: {
        student_id: studentId,
        assistance: {
          subject_id: subjectId,
          date: new Date(date)
        }
      },
      include: {
        assistance: true
      }
    })
    return assistance
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getSubjectScoreAverage = async (studentId, subjectId) => {
  const averageValues = {}

  try {
    for (const assignmentType of ASSIGNMENT_TYPE_LIST) {
      const aggregation = await prisma.score.aggregate({
        where: {
          assigment: {
            is_active: true,
            assignment_type: assignmentType,
            subject_id: subjectId
          },
          student: {
            id: studentId
          }
        },
        _avg: {
          score: true
        }
      })
      averageValues[assignmentType] = aggregation._avg.score
    }
    return averageValues
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getSubjectAssistanceScore = async (studentId, subjectId) => {
  const assistanceScore = {}

  try {
    for (const attended of [true, false]) {
      const aggregation = await prisma.studentAssistance.aggregate({
        _count: {
          attended: true
        },
        where: {
          attended: attended,
          student: {
            id: studentId
          },
          assistance: {
            is_active: true,
            subject_id: subjectId
          }
        }
      })
      if (attended) assistanceScore.attended = aggregation._count.attended
      assistanceScore.notAttended = aggregation._count.attended
    }

    return assistanceScore
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = {
  getStudentById,
  getStudentAssistance,
  getSubjectScoreAverage,
  getSubjectAssistanceScore
}
