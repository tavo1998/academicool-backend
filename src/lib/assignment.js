const { AssignmentType } = require('@prisma/client')

const ASSIGNMENT_TYPE_LIST = [
  AssignmentType.EXAM,
  AssignmentType.HOMEWORK,
  AssignmentType.LECTURE,
  AssignmentType.PARTICIPATION,
  AssignmentType.WORKSHOP
]

module.exports = {
  ASSIGNMENT_TYPE_LIST
}
