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

module.exports = {
  getStudentById,
  getStudentAssistance,
  getSubjectScoreAverage
}
