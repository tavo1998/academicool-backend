const {
  api,
  createTestData,
  deleteTestData,
  assignmentHomeworkData,
  assignmentUpdateData
} = require('../test_data')
const { server } = require('./../../index')
const { createJWT } = require('./../../lib/jwt')

let data

beforeAll(async () => {
  data = await createTestData()
})

describe('DELETE /api/v1/assignments/:assignmentId', () => {
  test('responds with unauthenticated user', async () => {
    const response = await api
      .delete(`/api/v1/assignments/${data.notice.id}`)
      .expect(401)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ message: 'Unauthenticated user' })
  })

  test('responds with 200 assignment delete successfully', async () => {
    const { title, description, assignment_type: assignmentType } = assignmentHomeworkData
    const token = createJWT({ userId: data.teacher.id })
    const response = await api
      .delete(`/api/v1/assignments/${data.assignment.id}`)
      .set('Cookie', `user_auth_token=${token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body.data).toEqual(
      expect.objectContaining({
        title,
        description,
        assignment_type: assignmentType
      })
    )
  })
})

describe('PUT /api/v1/assignments/:assignmentId', () => {
  test('responds with unauthenticated user', async () => {
    const response = await api
      .put(`/api/v1/assignments/${data.notice.id}`)
      .expect(401)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ message: 'Unauthenticated user' })
  })

  test('responds with 200 assignment update successfully', async () => {
    const token = createJWT({ userId: data.teacher.id })
    const response = await api
      .put(`/api/v1/assignments/${data.assignment.id}`)
      .set('Cookie', `user_auth_token=${token}`)
      .send(assignmentUpdateData)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body.data).toEqual(
      expect.objectContaining(assignmentUpdateData)
    )
  })
})

afterAll(async () => {
  await deleteTestData()
  server.close()
})
