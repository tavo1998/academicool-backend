const request = require('supertest')
const { app } = require('./../index')

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
  email: 'Juan@Perez.com'
}

module.exports = {
  api,
  institutionData,
  teacherData,
  subjectData,
  gradeData
}
