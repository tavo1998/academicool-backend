const prisma = require('./../config/database')

const getAssignmentById = async (id, includeSubject = false) => {
  try {
    const assignment = await prisma.assigment.findUnique({
      where: {
        id
      },
      include: {
        subject: includeSubject
      }
    })
    return assignment
  } catch (e) {
    console.log(e)
    throw e
  }
}

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

const updateAssignment = async (id, data) => {
  try {
    const updatedAssignment = await prisma.assigment.update({
      where: {
        id
      },
      data: data
    })
    return updatedAssignment
  } catch (e) {
    console.log(e)
    throw e
  }
}

const isAssignmentOfTeacher = async (assignmentId, userId) => {
  try {
    const assignment = await getAssignmentById(assignmentId, true)
    if (!assignment) return false
    return assignment.subject.teacher_id === userId
  } catch (e) {
    console.log(e)
    return false
  }
}

module.exports = {
  createAssignment,
  updateAssignment,
  getAssignmentById,
  isAssignmentOfTeacher
}
