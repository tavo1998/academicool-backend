const {
  api,
  createTestData,
  deleteTestData,
  noticeData,
  noticeUpdateData
} = require('../test_data')
const { server } = require('./../../index')
const { createJWT } = require('./../../lib/jwt')

let data

beforeAll(async () => {
  data = await createTestData()
})

describe('DELETE /api/v1/notices/:noticeId', () => {
  test('responds with unauthenticated user', async () => {
    const response = await api
      .delete(`/api/v1/notices/${data.notice.id}`)
      .expect(401)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ message: 'Unauthenticated user' })
  })

  test('responds with 200 notice delete successfully', async () => {
    const token = createJWT({ userId: data.teacher.id })
    const response = await api
      .delete(`/api/v1/notices/${data.notice.id}`)
      .set('Cookie', `user_auth_token=${token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body.data).toEqual(
      expect.objectContaining(noticeData)
    )
  })
})

describe('PUT /api/v1/notices/:noticeId', () => {
  test('responds with unauthenticated user', async () => {
    const response = await api
      .put(`/api/v1/notices/${data.notice.id}`)
      .expect(401)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ message: 'Unauthenticated user' })
  })

  test('responds with 200 notice update successfully', async () => {
    const token = createJWT({ userId: data.teacher.id })
    const response = await api
      .put(`/api/v1/notices/${data.notice.id}`)
      .set('Cookie', `user_auth_token=${token}`)
      .send(noticeUpdateData)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body.data).toEqual(
      expect.objectContaining(noticeUpdateData)
    )
  })
})

afterAll(async () => {
  await deleteTestData()
  server.close()
})
