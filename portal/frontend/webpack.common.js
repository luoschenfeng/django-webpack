const path = require('path')
const webpack = require('webpack')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { entryPoints, templatePluginList, rules } = require('./config/webpack')
const InlineScriptHtmlPlugin = require('./config/inline-script-html-plugin')
const injectJsPlugin = require('./config/inject-js-plugin')
const { alias } = require('./config/alias')
const context = path.resolve(alias["@"], './pages')
module.exports = {
  context: context,
  entry: entryPoints,
  output: {
    hashFunction: 'sha512',
    hashDigest: 'base64',
    hashDigestLength: 7,
    // filename: 'js/pages/[name].js?[hash]',
    filename: 'js/pages/[name].js?[hash]',
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
  module: {
    rules,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // new CleanWebpackPlugin(),
    ...templatePluginList,
    new InlineScriptHtmlPlugin(),
    new injectJsPlugin()
  ]
};
