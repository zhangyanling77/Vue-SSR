/**
 * webpack配置文件
 */
const merge = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const ClientRenderPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (dir) => {
  return path.resolve(__dirname, dir)
}

module.exports = merge(base, {
  entry: {
    client: resolve('../src/client-entry.js')
  },

  plugins: [
    new ClientRenderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('../public/index.html')
    })
  ]
})
