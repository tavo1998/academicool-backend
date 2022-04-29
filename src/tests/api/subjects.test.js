const {
  api,
  createTestData,
  subjectData,
  deleteTestData
} = require('../test_data')
const { server } = require('./../../index')
const { createJWT } = require('./../../lib/jwt')

let data

beforeAll(async () => {
  data = await createTestData()
})

describe('GET /api/v1/subjects', () => {
  test('responds with unauthenticated user', async () => {
    const response = await api
      .get('/api/v1/subjects')
      .expect(401)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ message: 'Unauthenticated user' })
  })

  test('teacher has one subject assigned', async () => {
    const token = createJWT({ userId: data.teacher.id })
    const response = await api
      .get('/api/v1/subjects')
      .set('Cookie', `user_auth_token=${token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining(subjectData)
      ])
    )
  })
})

afterAll(async () => {
  await deleteTestData()
  server.close()
})
