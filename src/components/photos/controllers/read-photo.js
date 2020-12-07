const { ALBUMS_DIR } = require('../../../../constants')
const { join } = require('path')

const readPhoto = async (req, res, next) => {
  const { albumName, fileName } = req.params
  const filepath = join(ALBUMS_DIR, albumName, fileName)
  const options = {
    root: ALBUMS_DIR,
    dotfiles: 'deny'
  }

  res.sendFile(filepath, options, (err) => {
    if (err) {
      res.status(err.status).json({
        message: 'ERROR'
      })
    }
  })
}

module.exports = {
  readPhoto
}
