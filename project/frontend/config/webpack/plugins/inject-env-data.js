// If your plugin is direct dependent to the html webpack plugin:
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { envObj } = require('../../env')
const swig  = require('swig')
const merge = require('lodash/merge')
 
class InjectEnvData {
  /**
   * 
   * @param {object} [globalEnv]
   */
  constructor(globalEnv) {
    this.globalEnv = globalEnv ? globalEnv : {};
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('InjectEnvData', (compilation) => {
 
      // Staic Plugin interface |compilation |H OOK NAME | register listener 
      HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
        'InjectEnvData', // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          data.html = swig.render(data.html, { 
            locals: merge(this.globalEnv, envObj, process.env), 
            tagControls: ['{!!?%', '%?!!}'],
            cache: false,
            autoescape: true,
            varControls: ['{{', '}}'],
            cmtControls: ['{!!?#', '#?!!}'],
            loader: swig.loaders.fs()
          })
          // Manipulate the content
          // Tell webpack to move on
          cb(null, data)
        }
      )
    })
  }
}
 
module.exports = InjectEnvData
