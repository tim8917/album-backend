const { overEvery, isFinite } = require('lodash/fp')

const listPhotosValidator = async (req, res, next) => {
  const { skip, limit } = req.body

  const isValid = overEvery([
    () => isFinite(skip) && skip >= 0,
    () => isFinite(limit) && limit >= 1
  ])

  if (isValid()) {
    return next()
  }

  res.status(400).json({
    message: 'ERROR',
    status: 400,
    params: req.body
  })
}

module.exports = {
  listPhotosValidator
}
