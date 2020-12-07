const express = require('express')
const { uploadPhotos } = require('./src/components/photos/middlewares')
const {
  deletePhoto, deletePhotos, listPhotos, readPhoto, uploadPhotosController
} = require('./src/components/photos/controllers')
const {
  ALBUMS_DIR, ALBUMS_VIRTUAL_PATH_PREFIX, CORS_ORIGIN, SERVER_PORT
} = require('./constants')
const { createServer } = require('http')
const cors = require('cors')

const app = express()

app.use(cors({ origin: CORS_ORIGIN }))

app.use(ALBUMS_VIRTUAL_PATH_PREFIX, express.static(ALBUMS_DIR))
app.get('/health', (req, res, next) => { res.json({ message: 'OK' }) })
app.post('/photos/list', express.json(), listPhotos)
app.get('/photos/:albumName/:fileName', readPhoto)
app.put('/photos', uploadPhotos, uploadPhotosController)
app.delete('/photos/:albumName/:fileName', deletePhoto)
app.delete('/photos', express.json(), deletePhotos)

const server = createServer(app)

server.listen(SERVER_PORT, () => {
  console.log(`server started at http://localhost:${SERVER_PORT}`)
})
