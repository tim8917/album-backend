const { getFilePaths, prepareDocuments } = require('./utils')
const { ALBUMS_DIR } = require('../../../../constants')

const listPhotos = async (req, res, next) => {
  const { body: { skip, limit } } = req
  const allDocuments = await getFilePaths(ALBUMS_DIR)
  const documents = prepareDocuments(skip, limit)(allDocuments)

  res.json({
    message: 'OK',
    documents,
    count: documents.length,
    skip,
    limit
  })
}

module.exports = {
  listPhotos
}
