// If your plugin is direct dependent to the html webpack plugin:
const HtmlWebpackPlugin = require('html-webpack-plugin')
 
// class MyPlugin {
//   apply (compiler) {
//     compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
//       console.log('The compiler is starting a new compilation...')
 
//       // Staic Plugin interface |compilation |HOOK NAME | register listener 
//       HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
//         'MyPlugin', // <-- Set a meaningful name here for stacktraces
//         (data, cb) => {
//           // Manipulate the content
//           data.html += 'The Magic Footer'
//           console.log(cb)
//           // Tell webpack to move on
//           cb(null, data)
//         }
//       )
//     })
//   }
// }
 
// module.exports = MyPlugin

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

class InlineChunkHtmlPlugin {
  constructor(htmlWebpackPlugin, tests) {
    // this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.tests = tests;
  }

  getInlinedTag(publicPath, assets, tag) {
    if (tag.tagName !== 'script' || !(tag.attributes && tag.attributes.src)) {
      return tag;
    }
    const scriptName = publicPath
      ? tag.attributes.src.replace(publicPath, '')
      : tag.attributes.src;
    if (!this.tests.some(test => scriptName.match(test))) {
      return tag;
    }
    const asset = assets[scriptName];
    if (asset == null) {
      return tag;
    }
    return { tagName: 'script', innerHTML: asset.source(), closeTag: true };
  }

  apply(compiler) {
    let publicPath = compiler.options.output.publicPath || '';
    if (publicPath && !publicPath.endsWith('/')) {
      publicPath += '/';
    }

    compiler.hooks.compilation.tap('InlineChunkHtmlPlugin', compilation => {
      const tagFunction = tag => {
        console.log(publicPath)
        console.log(compilation.assets)
        console.log(tag)

        this.getInlinedTag(publicPath, compilation.assets, tag);
      }

      
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tap('InlineChunkHtmlPlugin', (headTags, outputName) => {
        headTags.headTags = headTags.headTags.map(tagFunction);
        headTags.bodyTags = headTags.bodyTags.map(tagFunction);
      });

      // Still emit the runtime chunk for users who do not use our generated
      // index.html file.
      // hooks.afterEmit.tap('InlineChunkHtmlPlugin', () => {
      //   Object.keys(compilation.assets).forEach(assetName => {
      //     if (this.tests.some(test => assetName.match(test))) {
      //       delete compilation.assets[assetName];
      //     }
      //   });
      // });
    });
  }
}

module.exports = InlineChunkHtmlPlugin;
