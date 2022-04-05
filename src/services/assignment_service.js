const prisma = require('./../config/database')

const createAssignment = async (assignment) => {
  try {
    const newAssignment = await prisma.assigment.create({
      data: assignment
    })
    return newAssignment
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = {
  createAssignment
}
