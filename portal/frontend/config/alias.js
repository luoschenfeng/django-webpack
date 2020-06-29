const path = require('path')

const srcPath = path.resolve(__dirname, '../src')
const pathAlias =  {
  '@': srcPath,
  'template': path.resolve(srcPath, './templates'),
  'backendRootPath': path.resolve(srcPath, '../..'),
  'frontDestination': path.resolve(srcPath, '../../dist'),
}

exports.alias = {
  ...pathAlias
}
