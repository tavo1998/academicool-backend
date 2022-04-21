const prisma = require('./../config/database')

const getGradeById = async (id) => {
  try {
    const grade = await prisma.grade.findUnique({
      where: {
        id
      }
    })

    return grade
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getGradeStudents = async (gradeId) => {
  try {
    const students = await prisma.student.findMany({
      where: {
        grade_id: gradeId
      },
      orderBy: [
        {
          first_name: 'asc'
        },
        {
          last_name: 'asc'
        }
      ]
    })

    return students
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getGradeSubjects = async (gradeId) => {
  try {
    const subjects = await prisma.subject.findMany({
      where: {
        grade_id: gradeId,
        is_active: true
      },
      include: {
        teacher: true
      }
    })
    return subjects
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = {
  getGradeStudents,
  getGradeById,
  getGradeSubjects
}
