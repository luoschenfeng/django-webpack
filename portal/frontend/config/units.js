const path = require('path')
exports.sliceFileSuffix = fileName => fileName.replace(path.extname(fileName), '')
