const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: '/static/',
    writeToDisk: true,
    port: 8080,
    host: '0.0.0.0',
    hot: true,
    inline: true,
    proxy: {
      '*': 'http://localhost:8000 '
    },
    allowedHosts: [
      'localhost',
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
