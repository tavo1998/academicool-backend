const {
  api,
  institutionData,
  gradeData,
  subjectData
} = require('../test_data')
const { server } = require('./../../index')
const prisma = require('./../../config/database')

let institution
let grade
let subject

beforeAll(async () => {
  institution = await prisma.institution.create({
    data: institutionData
  })

  grade = await prisma.grade.create({
    data: {
      ...gradeData,
      institution: {
        connect: institution.id
      }
    }
  })

  subject = await prisma.subject.create({
    data: {
      ...subjectData,
      institution: {
        connect: institution.id
      },
      grade: {
        connect: grade.id
      }
    }
  })
})

afterAll(async () => {
  await prisma.institution.deleteMany({})
  await prisma.grade.deleteMany({})
  await prisma.subject.deleteMany({})
  server.close()
})

describe('GET /api/v1/users/me', () => {
  test('responds with unauthenticated user', async () => {
    await api
      .get('/api/v1/users/me')
      .expect(401)
      .expect('Content-Type', /json/)
  })
})
