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

const qualifyAssignment = async (assigmentId, scores) => {
  const scoresTransformed = scores.map((score) => ({
    score: score.value,
    student: {
      connect: {
        id: score.user_id
      }
    }
  }))

  try {
    const assignment = await prisma.assigment.update({
      where: {
        id: assigmentId
      },
      data: {
        is_qualified: true,
        scores: {
          create: scoresTransformed
        }
      }
    })
    return assignment
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getAssignmentScores = async (assignmentId, includeStudent = false, includeAssignment = false) => {
  try {
    const scores = await prisma.score.findMany({
      where: {
        assigment_id: assignmentId
      },
      include: {
        student: includeStudent,
        assigment: includeAssignment
      }
    })
    return scores
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = {
  createAssignment,
  updateAssignment,
  getAssignmentById,
  isAssignmentOfTeacher,
  qualifyAssignment,
  getAssignmentScores
}
