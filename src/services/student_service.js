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

module.exports = {
  getStudentById,
  getStudentAssistance
}
