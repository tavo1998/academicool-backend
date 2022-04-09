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

module.exports = {
  getStudentById
}
