const { Role } = require('@prisma/client')

const isAdmin = (role) => {
  return Role.ADMIN === role
}

const isTeacher = (role) => {
  return Role.TEACHER === role
}

module.exports = {
  isAdmin,
  isTeacher
}
