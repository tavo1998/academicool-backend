const { app } = require('./../index')
const { AssignmentType } = require('@prisma/client')
const request = require('supertest')
const prisma = require('./../config/database')

const api = request(app)

const institutionData = {
  name: 'Test School',
  address: 'Test Address'
}

const gradeData = {
  name: '6-3'
}

const subjectData = {
  name: 'Matemáticas'

}

const teacherData = {
  identification_id: '1102587458',
  first_name: 'Juan',
  last_name: 'Perez',
  email: 'Juan@Perez.com',
  role: 'TEACHER'
}

const attendantData = {
  identification_id: '1102587459',
  first_name: 'Carlos',
  last_name: 'Sanchez',
  email: 'Carlos@Sanchez.com',
  role: 'ATTENDANT'
}

const studentData = {
  identification_id: '1102587460',
  first_name: 'Pablo',
  last_name: 'Gomez',
  email: 'Pablo@Gomez.com'
}

const assignmentHomeworkData = {
  title: 'Assignment 1',
  description: 'Assignment',
  assignment_type: AssignmentType.HOMEWORK,
  delivery_date: new Date('2022-05-20')

}

const noticeData = {
  title: 'Test notice',
  description: 'Test notice description'
}

const noticeUpdateData = {
  title: 'Notice updated'
}

const createTestData = async () => {
  const institution = await prisma.institution.create({
    data: institutionData
  })

  const grade = await prisma.grade.create({
    data: {
      ...gradeData,
      institution: {
        connect: {
          id: institution.id
        }
      }
    }
  })

  const teacher = await prisma.user.create({
    data: {
      ...teacherData,
      institution: {
        connect: {
          id: institution.id
        }
      }
    }
  })

  const attendant = await prisma.user.create({
    data: {
      ...attendantData,
      institution: {
        connect: {
          id: institution.id
        }
      }
    }
  })

  const student = await prisma.student.create({
    data: {
      ...studentData,
      institution: {
        connect: {
          id: institution.id
        }
      },
      grade: {
        connect: {
          id: grade.id
        }
      },
      attendant: {
        connect: {
          id: attendant.id
        }
      }
    }
  })

  const subject = await prisma.subject.create({
    data: {
      ...subjectData,
      institution: {
        connect: {
          id: institution.id
        }
      },
      grade: {
        connect: {
          id: grade.id
        }
      },
      teacher: {
        connect: {
          id: teacher.id
        }
      }
    }
  })

  const assignment = await prisma.assigment.create({
    data: {
      ...assignmentHomeworkData,
      subject: {
        connect: {
          id: subject.id
        }
      }
    }
  })

  const notice = await prisma.notice.create({
    data: {
      ...noticeData,
      subject: {
        connect: {
          id: subject.id
        }
      }
    }
  })

  return {
    institution,
    grade,
    teacher,
    subject,
    student,
    notice,
    assignment
  }
}

const deleteTestData = async () => {
  await prisma.assigment.deleteMany({})
  await prisma.notice.deleteMany({})
  await prisma.subject.deleteMany({})
  await prisma.student.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.grade.deleteMany({})
  await prisma.institution.deleteMany({})
  await prisma.$disconnect()
}

module.exports = {
  api,
  createTestData,
  deleteTestData,
  institutionData,
  teacherData,
  subjectData,
  gradeData,
  attendantData,
  assignmentHomeworkData,
  noticeData,
  noticeUpdateData
}
