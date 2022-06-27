const {
  api,
  createTestData,
  subjectData,
  deleteTestData,
  assignmentHomeworkData,
  noticeData
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

describe('POST /api/v1/subjects/:subjectId/assignments', () => {
  test('responds with unauthenticated user', async () => {
    const response = await api
      .post(`/api/v1/subjects/${data.subject.id}/assignments`)
      .expect(401)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ message: 'Unauthenticated user' })
  })

  test('responds with 400 bad request due to missing data', async () => {
    const token = createJWT({ userId: data.teacher.id })
    await api
      .post(`/api/v1/subjects/${data.subject.id}/assignments`)
      .set('Cookie', `user_auth_token=${token}`)
      .expect(400)
      .expect('Content-Type', /json/)
  })

  test('responds with 200 assignment created successfully', async () => {
    const token = createJWT({ userId: data.teacher.id })
    await api
      .post(`/api/v1/subjects/${data.subject.id}/assignments`)
      .set('Cookie', `user_auth_token=${token}`)
      .send(assignmentHomeworkData)
      .expect(201)
      .expect('Content-Type', /json/)
  })
})

describe('GET /api/v1/subjects/:subjectId/notices', () => {
  test('responds with unauthenticated user', async () => {
    const response = await api
      .get(`/api/v1/subjects/${data.subject.id}/notices`)
      .expect(401)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ message: 'Unauthenticated user' })
  })

  test('teacher has one notice created', async () => {
    const token = createJWT({ userId: data.teacher.id })
    const response = await api
      .get(`/api/v1/subjects/${data.subject.id}/notices?pagination=0`)
      .set('Cookie', `user_auth_token=${token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining(noticeData)
      ])
    )
  })
})

describe('POST /api/v1/subjects/:subjectId/notices', () => {
  test('responds with unauthenticated user', async () => {
    await api
      .post(`/api/v1/subjects/${data.subject.id}/notices`)
      .send(noticeData)
      .expect(401)
      .expect('Content-Type', /json/)
  })

  test('responds with 400 bad request due to missing data', async () => {
    const token = createJWT({ userId: data.teacher.id })
    await api
      .post(`/api/v1/subjects/${data.subject.id}/notices`)
      .set('Cookie', `user_auth_token=${token}`)
      .expect(400)
      .expect('Content-Type', /json/)
  })

  test('responds with 200 notice created successfully', async () => {
    const token = createJWT({ userId: data.teacher.id })
    await api
      .post(`/api/v1/subjects/${data.subject.id}/notices`)
      .set('Cookie', `user_auth_token=${token}`)
      .send(noticeData)
      .expect(201)
      .expect('Content-Type', /json/)
  })
})

afterAll(async () => {
  await deleteTestData()
  server.close()
})
