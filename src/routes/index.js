const {
  deletePhoto, deletePhotos, listPhotos, readPhoto, uploadPhotosController
} = require('../components/photos/controllers')
const {
  listPhotosValidator
} = require('../components/photos/validators')
const { uploadPhotos } = require('../components/photos/middlewares')
const {
  CORS_ORIGIN
} = require('../../constants')
const cors = require('cors')
const express = require('express')

const initRoutes = (app) => {
  app.use(cors({ origin: CORS_ORIGIN }))

  // FETCH endpoints
  app.get('/health', (req, res) => { res.json({ message: 'OK' }) })
  app.get('/photos/:albumName/:fileName', readPhoto)
  app.post('/photos/list', express.json(), listPhotosValidator, listPhotos)

  // MODIFYING endpoints
  app.put('/photos', uploadPhotos, uploadPhotosController)
  app.delete('/photos/:albumName/:fileName', deletePhoto)
  app.delete('/photos', express.json(), deletePhotos)
}

module.exports = { initRoutes }
