const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { entryPoints: entry, templatePluginList } = require('./config/webpack/multi-entry-template')
const rules = require('./config/webpack/rules')
const InlineScriptHtmlPlugin = require('./config/webpack/plugins/inline-script-html-plugin')
const injectJsPlugin = require('./config/webpack/plugins/inject-js-plugin')
const injectEnvData = require('./config/webpack/plugins/inject-env-data')
const { alias } = require('./config/alias')
const { webpackEnvConfig } = require('./config/env')
const context = path.resolve(alias["@"], './pages')
module.exports = {
  context: context,
  entry,
  output: {
    hashFunction: 'sha512',
    hashDigest: 'base64',
    hashDigestLength: 7,
    // filename: 'js/pages/[name].js?[contentHash]',
    filename: 'js/pages/[name].js?[contentHash]',
    path: alias.frontDestination,
    publicPath: "/static/",
  },
  resolve: {
    alias,
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
          filename: 'js/modules/[name].js?[contentHash]'
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
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false,}),
    new webpack.ProgressPlugin(),
    ...templatePluginList,
    // new InlineScriptHtmlPlugin(),
    new injectJsPlugin(),
    new injectEnvData(),
    new webpack.DefinePlugin({
      ...webpackEnvConfig
    })
  ],
  // stats: 'errors-only'
};