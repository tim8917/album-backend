const { ALBUMS_DIR } = require('../../../../constants')
const { extractFilepaths } = require('./utils')
const { unlink } = require('fs').promises
const { relative } = require('path')

const deletePhotos = async (req, res, next) => {
  const { body: buckets = [] } = req
  const filePaths = extractFilepaths(buckets)
  const deleted = []
  const cannotDelete = []

  for (const filepath of filePaths) {
    const name = relative(ALBUMS_DIR, filepath)

    try {
      await unlink(filepath)
      deleted.push(name)
    } catch (error) {
      cannotDelete.push(name)
    }
  }

  res.json({
    message: 'OK',
    deleted,
    cannotDelete
  })
}

module.exports = {
  deletePhotos
}
