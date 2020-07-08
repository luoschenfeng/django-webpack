const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const path = require('path');
const { alias } = require('./config/alias')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: alias.frontDestination,
    liveReload: true,
    publicPath: '/static/',
    writeToDisk: true,
    port: 2020,
    host: '0.0.0.0',
    proxy: {
      '*': 'http://localhost:8000 '
    },
    allowedHosts: [
      'localhost',
    ]
  },
  output: {
    hashFunction: 'sha512',
    hashDigest: 'base64',
    hashDigestLength: 7,
    // filename: 'js/pages/[name].js?[hash]',
    filename: 'js/pages/[name].js?[hash]',
    path: alias.frontDestination,
    publicPath: "/static/",
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: (module, chunks, cacheGroupKey) => {
            let moduleFileName = module.identifier().split('/').reduceRight(item => item);
            const moduleFileNameSplit = moduleFileName.split('.')
            if (moduleFileNameSplit[1] === 'js') {
              moduleFileName = moduleFileNameSplit[0]
            }
            return `module/${moduleFileName}`;
          },
          filename: 'js/modules/[name].js?[hash]'
        },
      }
    },
  },
});
