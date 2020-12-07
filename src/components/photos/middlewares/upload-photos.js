const util = require('util')
const path = require('path')
const multer = require('multer')
const { ALBUMS_DIR } = require('../../../../constants')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const { album } = req.body

    callback(null, path.join(ALBUMS_DIR, album))
  },
  filename: (req, file, callback) => {
    const match = ['image/png', 'image/jpeg']

    if (match.indexOf(file.mimetype) === -1) {
      const message = `${file.originalname} is invalid. Only accept png/jpeg.`
      return callback(message, null)
    }

    callback(null, file.originalname)
  }
})

module.exports = {
  uploadPhotos: util.promisify(
    multer({ storage }).any()
  )
}
