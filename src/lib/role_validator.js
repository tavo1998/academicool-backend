const { Role } = require('@prisma/client')

const isTeacher = (role) => {
  return Role.TEACHER === role
}

const isAttendant = (role) => {
  return Role.ATTENDANT === role
}

module.exports = {
  isTeacher,
  isAttendant
}
