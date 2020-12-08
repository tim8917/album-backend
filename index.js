const express = require('express')
const { CORS_ORIGIN, SERVER_PORT } = require('./constants')
const { createServer } = require('http')
const { initRoutes } = require('./src/routes')
const helmet = require('helmet')
const cors = require('cors')

const app = express()

app.use(cors({ origin: CORS_ORIGIN }))
app.use(helmet())
initRoutes(app)

const server = createServer(app)

server.listen(SERVER_PORT, () => {
  console.log(`server started at http://localhost:${SERVER_PORT}`)
})
