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
                "targets": {
                  "edge": "17",
                  "firefox": "60",
                  "chrome": "67",
                  "safari": "11.1",
                },
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
