const {
  api,
  createTestData,
  teacherData,
  deleteTestData
} = require('../test_data')
const { server } = require('./../../index')
const { createJWT } = require('./../../lib/jwt')

let data

beforeAll(async () => {
  data = await createTestData()
})

describe('GET /api/v1/users/me', () => {
  test('responds with unauthenticated user', async () => {
    const response = await api
      .get('/api/v1/users/me')
      .expect(401)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ message: 'Unauthenticated user' })
  })

  test('responds with user info', async () => {
    const token = createJWT({ userId: data.teacher.id })
    const response = await api
      .get('/api/v1/users/me')
      .set('Cookie', `user_auth_token=${token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).toMatchObject(teacherData)
  })
})

afterAll(async () => {
  await deleteTestData()
  server.close()
})
