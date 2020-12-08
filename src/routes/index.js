const {
  deletePhoto, deletePhotos, listPhotos, readPhoto, uploadPhotosController
} = require('../components/photos/controllers')
const {
  listPhotosValidator
} = require('../components/photos/validators')
const { uploadPhotos } = require('../components/photos/middlewares')
const {
  PHOTOS_API_PATH
} = require('../../constants')
const express = require('express')

const initRoutes = (app) => {
  // FETCH endpoints
  app.get('/health', (req, res) => { res.json({ message: 'OK' }) })
  app.get(PHOTOS_API_PATH + '/:albumName/:fileName', readPhoto)
  app.post(PHOTOS_API_PATH + '/list', express.json(), listPhotosValidator, listPhotos)

  // MODIFYING endpoints
  app.put(PHOTOS_API_PATH, uploadPhotos, uploadPhotosController)
  app.delete(PHOTOS_API_PATH + '/:albumName/:fileName', deletePhoto)
  app.delete(PHOTOS_API_PATH, express.json(), deletePhotos)
}

module.exports = { initRoutes }
