const { formatFilepaths } = require('./utils')
const { flowRight, map } = require('lodash/fp')

const uploadPhotosController = async (req, res, next) => {
  const { files } = req
  const formatFilesData = flowRight(
    formatFilepaths,
    map(({ path }) => path)
  )

  res.json({
    message: 'OK',
    data: formatFilesData(files)
  })
}

module.exports = {
  uploadPhotosController
}
