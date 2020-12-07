const path = require('path')

module.exports = {
  ALBUMS_DIR: path.join(__dirname, 'albums'),
  ALBUMS_VIRTUAL_PATH_PREFIX: '/photos',
  CORS_ORIGIN: 'http://localhost:3000',
  PROJECT_ROOT_DIR: __dirname,
  SERVER_PORT: 8888
}
