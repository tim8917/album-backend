const { ALBUMS_DIR } = require('../../../../constants')
const { unlink } = require('fs').promises
const { join } = require('path')

const deletePhoto = async (req, res, next) => {
  const { albumName, fileName } = req.params
  const filepath = join(ALBUMS_DIR, albumName, fileName)
  let isDeleted = false

  try {
    await unlink(filepath)
    isDeleted = true
  } catch (error) {
    console.log({ error })
  }

  res.json({
    message: 'OK',
    isDeleted
  })
}

module.exports = {
  deletePhoto
}
