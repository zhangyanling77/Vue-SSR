/**
 * webpack配置文件
 */
const merge = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ServerRenderPlugin = require('vue-server-renderer/server-plugin')

const resolve = (dir) => {
  return path.resolve(__dirname, dir)
}

module.exports = merge(base, {
  entry: {
    server: resolve('../src/server-entry.js')
  },
  target: 'node', // 要用来给node使用
  output: {
    libraryTarget: 'commonjs2' // 把最终文件的导出结果放到module.exports上
  },
  plugins: [
    new ServerRenderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: resolve('../public/index.ssr.html'),
      excludeChunks: ['server'] // 排除某个模块
    })
  ],
})
