module.exports = [
  {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                "useBuiltIns": "usage",
                "corejs": "3.6.4",
              }
            ]
          ]
        }
      }
    ]
  },
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
          name: '[path][name].[ext]?[sha512:hash:base64:7]',
          context: 'src'
        },
      },
    ],
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].css?[sha512:hash:base64:7]',
          context: 'src'
        },
        
      }, 

      "extract-loader",
      // Translates CSS into CommonJS
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      // Compiles Sass to CSS
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      }
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
              {
                tag: 'link',
                attribute: 'href',
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
