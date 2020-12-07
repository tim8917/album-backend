const express = require('express')
const { SERVER_PORT } = require('./constants')
const { createServer } = require('http')
const { initRoutes } = require('./src/routes')

const app = express()

initRoutes(app)

const server = createServer(app)

server.listen(SERVER_PORT, () => {
  console.log(`server started at http://localhost:${SERVER_PORT}`)
})
