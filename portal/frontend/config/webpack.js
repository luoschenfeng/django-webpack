const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const requireContext = require('require-context');
const differenceBy  = require('lodash/differenceBy')
const { alias } = require('./alias')
const { sliceFileSuffix } = require('./units')
const jsEntryPath = path.resolve(alias["@"], './pages')
const templateEntryPath = path.resolve(alias["@"], './templates')

// 入口js文件
let entryPoints = {}

// html-webpack-Plugin
let templatePluginList = []

// jsEntryPointKey eg: [ 'home/index', 'record/index' ]
let jsEntryPointKeyList = requireContext(path.resolve(jsEntryPath), true, /\.js$/).keys().map(value => sliceFileSuffix(value))

// templateRelativeFileNameList eg: ['home/index.html', 'layout/components/aside.html',]
let templateRelativeFileNameList = requireContext(path.resolve(templateEntryPath), true, /\.html$/).keys()

templateRelativeFileNameList.forEach(relativeFileName => {
  // eg: relativeFileName: home/index.html => home/index: templateKey
  let templateKey = sliceFileSuffix(relativeFileName)

  // 模板的filename,template
  let templatebaseName = relativeFileName
  let filebaseName = templateKey + '.html'
  let templateRelativePath = path.join('./templates/' + templatebaseName)
  let fileRelativePath = path.join('./templates/' + filebaseName)
  let template = path.resolve(alias["@"], templateRelativePath)
  let filename = path.resolve(alias.frontDestination, fileRelativePath) 

  if (jsEntryPointKeyList.includes(templateKey)) {
    let jsEntryPointKey = templateKey

    // eg: jsEntryPointValue:  ./home/index.js(// 相对于./src/pages/)
    let jsEntryPointValue = './' + jsEntryPointKey + '.js'
    
    // 入口js文件
    entryPoints[jsEntryPointKey] = jsEntryPointValue

    // 相应的入口模板
    templatePluginList.push(
      new HtmlWebpackPlugin({
        filename: filename,
        template: template,
        inject: false,
        title: '',
        templateParameters: {},
        chunks: [jsEntryPointKey]
      })
    )
  } else {
    // 没有相应的入口文件
    templatePluginList.push(
      new HtmlWebpackPlugin({
        filename: filename,
        template: template,
        title: '',
        inject: false,
        templateParameters: {},
        chunks: []
      })
    )
  }
})



let rules =  [
  // {
  //   test: /\.m?js$/,
  //   exclude: /(node_modules|bower_components)/,
  //   use: [
  //     {
  //       loader: 'babel-loader',
  //       options: {
  //         presets: [
  //           [
  //             '@babel/preset-env',
  //             {
  //               "targets": {
  //                 "edge": "17",
  //                 "firefox": "60",
  //                 "chrome": "67",
  //                 "safari": "11.1",
  //               },
  //               "useBuiltIns": "usage",
  //               "corejs": "3.6.4",
  //             }
  //           ]
  //         ]
  //       }
  //     }
  //   ]
  // },
  // {
  //   test: /\.css$/,
  //   use: [
  //     {loader: 'style-loader'},
  //     {loader: 'css-loader'},
  //   ]
  // },
  {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[sha512:hash:base64:7]',
          outputPath: 'assets/images',
        },
      },
    ],
  },
  {
    test: /\.html$/i,
    use: [
      {
        loader: 'html-loader',
        options: {
          // Disables attributes processing
          // attributes: false,
          esModule: true,
          attributes: {
            list: [
              {
                // Tag name
                tag: 'img',
                // Attribute name
                attribute: 'src',
                // Type of processing, can be `src` or `scrset`
                type: 'src',
              },
            ],
          },
          minimize: {
            removeComments: false,
          },
        },
      },
    ]
  },
]
module.exports = {
  entryPoints,
  templatePluginList,
  rules,
}
