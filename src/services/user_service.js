const prisma = require('../config/database')
const sgMail = require('@sendgrid/mail')

async function getUserByEmail (email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return user
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function getUserById (id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return user
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function getUserStudents (userId) {
  try {
    const students = await prisma.student.findMany({
      where: {
        attendant_id: userId
      },
      include: {
        grade: {
          include: {
            director: true
          }
        },
        institution: true
      },
      orderBy: [
        {
          first_name: 'asc'
        },
        {
          last_name: 'asc'
        }
      ]
    })
    return students
  } catch (e) {
    console.log(e)
    throw e
  }
}

const createMessageObject = (title, description, user) => {
  return {
    to: process.env.SUPPORT_EMAIL,
    from: process.env.SUPPORT_EMAIL,
    subject: `[BUG-REPORT] ${title}`,
    text: `Nombre: ${user.first_name} ${user.last_name} \nCorreo: ${user.email} \nRol: ${user.role} \n\n${description}
    `
  }
}

const sendSupportEmail = async (data, user) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  try {
    const message = createMessageObject(data.title, data.description, user)
    await sgMail.send(message)
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = {
  getUserByEmail,
  getUserById,
  getUserStudents,
  sendSupportEmail
}
