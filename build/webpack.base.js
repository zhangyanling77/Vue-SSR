/**
 * 公用配置
 */
const path = require('path')
const VueLoader = require('vue-loader/lib/plugin')

// 查找文件的相对位置
const resolve = (dir) => {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 出口
  output: {
    filename: '[name].bundle.js',
    path: resolve('../dist')
  },
  resolve: {
    // 解析
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },

      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoader(),
    
  ]
}
