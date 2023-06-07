const webpack = require('webpack')
const path = require('path')

module.exports = function (context, options) {
  return {
    name: '@devcycle/docusaurus-theme-devcycle',
    getThemePath() {
      return path.resolve(__dirname, './theme')
    },
    configureWebpack(config, isServer, utils, content) {
      https: return {
        plugins: [
          new webpack.DefinePlugin({
            // github.com/rohit-gohri/redocusaurus/issues/236
            'process.env.DEBUG': 'process.env.DEBUG',
            'process.env.DEVCYCLE_CLIENT_SDK_TOKEN': JSON.stringify(
              options.sdkKey,
            ),
          }),
        ],
      }
    },
  }
}
