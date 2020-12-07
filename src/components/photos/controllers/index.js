const { deletePhotos } = require('./deletePhotos')
const { deletePhoto } = require('./deletePhoto')
const { uploadPhotosController } = require('./upload-photos-controller')
const { readPhoto } = require('./read-photo')
const { listPhotos } = require('./list-photos')

module.exports = {
  deletePhoto,
  deletePhotos,
  listPhotos,
  readPhoto,
  uploadPhotosController
}
