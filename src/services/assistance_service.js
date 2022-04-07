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

const updateAssistanceStudents = async (assistanceId, assistances) => {
  try {
    const newAssistances = await prisma.$transaction(
      assistances.map(
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
    )
    return newAssistances
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = {
  updateAssistanceStudents,
  getAssistanceById
}
