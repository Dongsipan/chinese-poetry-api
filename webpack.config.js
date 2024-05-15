/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main',
  target: 'node',
  // 打包后的文件名称以及位置
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: __dirname + '/node_modules/swagger-ui-dist/', to: './' },
      ],
    }),
    // 删除多余的文件
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [
        __dirname + '/dist/*.html',
        __dirname + '/dist/*.map',
        __dirname + '/dist/*.md',
        __dirname + '/dist/*.json',
        __dirname + '/dist/index.js',
        __dirname + '/dist/LICENSE',
        __dirname + '/dist/NOTICE',
      ],
    }),
  ],
};
