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

module.exports = {
  getSubjects,
  getTeacherSubjects
}
