const { Role } = require('@prisma/client')

const isAdmin = (role) => {
  return Role.ADMIN === role
}

const isTeacher = (role) => {
  return Role.TEACHER === role
}

const isAttendant = (role) => {
  return Role.ATTENDANT === role
}

module.exports = {
  isAdmin,
  isTeacher,
  isAttendant
}
