const prisma = require('./../config/database')

const getAssistanceById = async (id, includeSubject = false) => {
  try {
    const assistance = await prisma.assistance.findUnique({
      where: {
        id
      },
      include: {
        subject: includeSubject
      }
    })
    return assistance
  } catch (e) {
    console.log(e)
    throw e
  }
}

const updateAssistanceStudents = async (assistanceId, data) => {
  try {
    const [assistance, students] = await prisma.$transaction([
      prisma.assistance.update({
        where: {
          id: assistanceId
        },
        data: {
          description: data.description
        }
      }),
      ...data.assistances.map(
        assistance => prisma.studentAssistance.update({
          where: {
            student_id_assistance_id: {
              assistance_id: assistanceId,
              student_id: assistance.student_id
            }
          },
          data: {
            attended: assistance.attended
          }
        })
      )
    ])
    assistance.students = students
    return assistance
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = {
  updateAssistanceStudents,
  getAssistanceById
}
