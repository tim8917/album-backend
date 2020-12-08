const path = require('path')

module.exports = {
  ALBUMS_DIR: path.join(__dirname, 'albums'),
  PHOTOS_API_PATH: '/photos',
  CORS_ORIGIN: 'http://localhost:3000',
  PROJECT_ROOT_DIR: __dirname,
  SERVER_PROTOCOL: 'http',
  SERVER_HOST: 'localhost',
  SERVER_PORT: 8888
}
