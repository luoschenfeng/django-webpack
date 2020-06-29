const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { entryPoints, templatePluginList, rules } = require('./config/webpack')
const InlineChunkHtmlPlugin = require('./config/inline-chunk-html-plugin')
const { alias } = require('./config/alias')
const context = path.resolve(alias["@"], './pages')
module.exports = {
  context: context,
  entry: entryPoints,
  output: {
    hashFunction: 'sha512',
    hashDigest: 'base64',
    hashDigestLength: 7,
    // filename: 'js/pages/[name].js?[contenthash]',
    filename: 'js/pages/[name].js?[contenthash]',
    path: alias.frontDestination,
    publicPath: "/static/",
  },
  resolve: {
    alias: alias,
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: 'js/modules/[name].js?[contenthash]'
        },
      }
    },
  },
  module: {
    rules,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin(),
    ...templatePluginList,
    new InlineChunkHtmlPlugin()
  ]
};
