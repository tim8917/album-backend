const {
  ALBUMS_DIR, PHOTOS_API_PATH, PROJECT_ROOT_DIR, SERVER_PORT, SERVER_PROTOCOL, SERVER_HOST
} = require('../../../../constants')
const {
  join, basename, relative, dirname, sep
} = require('path')
const { readdir } = require('fs').promises
const {
  filter, map, flowRight, split, last, capitalize, flatMap, trim, flattenDeep, slice
} = require('lodash/fp')
const { createHash } = require('crypto')

const getFilePaths = async (parentDirPath) => {
  const entries = await readdir(parentDirPath, { withFileTypes: true })

  const subdirPaths = flowRight(
    map(({ name }) => join(parentDirPath, name)),
    filter(dir => dir.isDirectory())
  )(entries)

  const buckets = await Promise.all(
    map(async entryPath => ({ album: entryPath, documents: await readdir(entryPath) }), subdirPaths)
  )
  const filePaths = flatMap(({ album, documents }) => (
    map((filename) => join(album, filename), documents)
  ), buckets)

  return [...filePaths]
}

// Provide a `filepath`
const getAlbumName = flowRight(
  capitalize,
  last,
  split(sep),
  dirname
)

const getMd5 = (string) => createHash('md5').update(string).digest('hex')

const formatFilepaths =
  map((filepath) => ({
    album: getAlbumName(filepath),
    name: basename(filepath),
    path: relative(PROJECT_ROOT_DIR, filepath),
    raw: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}${PHOTOS_API_PATH}/${relative(ALBUMS_DIR, filepath)}`
  }))

const extractFilepaths = flowRight(
  map((filename) => join(ALBUMS_DIR, filename)),
  flattenDeep,
  map(({ album, documents }) => (flowRight(
    map((filename) => join(album, filename)),
    map(trim),
    split(',')
  )(documents)))
)

const prepareDocuments = (skip, limit) => {
  return flowRight(
    map((document) => ({
      id: getMd5(join(document.album, document.name)),
      ...document
    })),
    formatFilepaths,
    slice(skip, skip + limit)
  )
}

module.exports = {
  extractFilepaths,
  formatFilepaths,
  getMd5,
  getFilePaths,
  prepareDocuments
}
