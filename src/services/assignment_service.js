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

const desactivateAssignmentById = async (id) => {
  try {
    const assignmentDeleted = await prisma.assigment.update({
      where: {
        id
      },
      data: {
        is_active: false
      }
    })
    return assignmentDeleted
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

const transformScoresToPost = (scores) => {
  const transformedScores = scores.map((score) => ({
    score: score.value,
    commentary: score.commentary,
    student: {
      connect: {
        id: score.student_id
      }
    }
  }))

  return transformedScores
}

const qualifyAssignment = async (assigmentId, scores) => {
  const scoresTransformed = transformScoresToPost(scores)

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

const updateAssignmentScores = (assigmentId, scores) => {
  try {
    const updatedScores = prisma.$transaction(
      scores.map(score =>
        prisma.score.update({
          where: {
            assigment_id_student_id: {
              assigment_id: assigmentId,
              student_id: score.student_id
            }
          },
          data: {
            score: score.value,
            commentary: score.commentary
          }
        }))
    )
    return updatedScores
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
  getAssignmentScores,
  updateAssignmentScores,
  desactivateAssignmentById
}
