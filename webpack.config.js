'use strict';

const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname, '/app');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
process.noDeprecation = true;
module.exports = {
  devtool: 'eval',
  cache: true,
  entry: [
    'whatwg-fetch',
    'webpack-hot-middleware/client?reload=true&timeout=1000&noInfo=true',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      srcPath,
      'node_modules',
      'app'
    ],
    extensions: ['.js']
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./node_modules/vendor-manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve('./node_modules/vendor.bundle.js'),
      includeSourcemap: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      { test: /\.js?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader?cacheDirectory',
          options: {
            presets: [
              'react',
              'es2015',
              'stage-0',
              'react-hmre'
            ]
          }
        },
        {
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
            cache: true
          }
        }]
      },
      { test: /\.json?$/,
        use: 'json-loader'
      },
      { test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded'
            }
          }
        ]
      },
      { test: /\.(woff|woff2|ttf|eot|svg|gif|png|jpge?g)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?name=[name].[hash].[ext]'
      }
    ]
  }
};
