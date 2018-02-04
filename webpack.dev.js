const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new webpack.EnvironmentPlugin([
      'GOOGLE_API_KEY',
      'SERVER_URL'
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {loader: "babel-loader"}
      },
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      }
    ]
  }
}
