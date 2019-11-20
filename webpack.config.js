const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    qybl_baidu: path.resolve(__dirname, 'src/view/qybl_baidu.js'),
    qybl: path.resolve(__dirname, 'src/view/qybl.js'),
    kmfy: path.resolve(__dirname, 'src/view/kmfy.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' }, 
          { loader: 'css-loader' }, 
          { loader: 'style-loader/url' }, 
          { loader: 'file-loader' }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|eot|svg|ttf)$/,
        use: { loader: 'url-loader' }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/asset/template.html',
      filename: 'qybl_baidu.html',
      chunks: ['qybl_baidu'],
      title: '区域病理-百度',
      path: path.resolve(__dirname),
    }),
    new HtmlWebpackPlugin({
      template: './src/asset/template.html',
      filename: 'qybl.html',
      chunks: ['qybl'],
      title: '区域病理',
      path: path.resolve(__dirname),
    }),
    new HtmlWebpackPlugin({
      template: './src/asset/template.html',
      filename: 'kmfy.html',
      chunks: ['kmfy'],
      title: '昆明妇幼',
      path: path.resolve(__dirname),
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
      open: 'Chrome',
      host: 'localhost',
      port: 8080,
      inline: true,
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      // publicPath: path.resolve(__dirname, 'dist'),
      hot: true,
      open: true,
      // openPage: 'qybl_baidu.html',
      openPage: 'qybl.html',
  },
}

