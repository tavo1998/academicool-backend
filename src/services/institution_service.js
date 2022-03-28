const prisma = require('../config/database')

async function getInstitutions () {
  try {
    const institutions = await prisma.institution.findMany()
    return institutions
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function createInstitution (data) {
  try {
    const institution = await prisma.institution.create({
      data: data
    })
    return institution
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function updateInstiution (id, data) {
  try {
    const updatedInstitution = await prisma.institution.update({
      where: {
        id: id
      },
      data: data
    })
    return updatedInstitution
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function deleteInstitution (id) {
  try {
    const deletedUser = await prisma.institution.delete({
      where: {
        id
      }
    })
    return deletedUser
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = {
  getInstitutions,
  createInstitution,
  updateInstiution,
  deleteInstitution
}
