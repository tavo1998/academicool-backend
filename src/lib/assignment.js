const { AssignmentType } = require('@prisma/client')

const ASSIGNMENT_TYPE_LIST = [
  AssignmentType.EXAM,
  AssignmentType.HOMEWORK,
  AssignmentType.LECTURE,
  AssignmentType.PARTICIPATION,
  AssignmentType.WORKSHOP,
  AssignmentType.QUIZ,
  AssignmentType.PROJECT
]

module.exports = {
  ASSIGNMENT_TYPE_LIST
}
