const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const path = require('path');
const { alias } = require('./config/alias')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    publicPath: '/static/',
    contentBase: alias.frontDestination,
    // hot: true,
    watchContentBase: true,
    liveReload: true,
    writeToDisk: true,
    open: true,
    port: 2024,
    host: '0.0.0.0',
    proxy: {
      '*': 'http://localhost:8000 '
    },
    allowedHosts: [
      'localhost',
    ],
    onListening(server) {
      const port = server.listeningApp.address().port;
      console.log('Listening on port:', port);
    },
    overlay: true
  },
  output: {
    filename: 'js/pages/[name].js?[fullhash]',
  },
});
