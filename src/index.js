const express = require('express')
const authRouterV1 = require('./routers/v1/auth')
const subjectRouter = require('./routers/v1/subject')
const assignmentRoterV1 = require('./routers/v1/assignment')
const noticeRouterV1 = require('./routers/v1/notices')
const assistanceRouterV1 = require('./routers/v1/assistance')
const studentRouterV1 = require('./routers/v1/student')
const gradeRouterV1 = require('./routers/v1/grade')
const userRouterV1 = require('./routers/v1/user')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morgan('tiny'))

app.use('/api/v1/auth', authRouterV1)
app.use('/api/v1/subjects', subjectRouter)
app.use('/api/v1/assignments', assignmentRoterV1)
app.use('/api/v1/grades', gradeRouterV1)
app.use('/api/v1/notices', noticeRouterV1)
app.use('/api/v1/assistances', assistanceRouterV1)
app.use('/api/v1/students', studentRouterV1)
app.use('/api/v1/users', userRouterV1)

const server = app.listen(process.env.PORT, () => {
  console.log('Server running')
})

module.exports = {
  app,
  server
}
