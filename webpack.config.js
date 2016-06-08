var webpack = require('webpack');

module.exports = {
  entry: './whatkey.js',

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      },
      compress: {
        warnings: false
      }
    })
  ],

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-3'],
          cacheDirectory: true
        }
      },
    ]
  },

  devtool: 'cheap-module-eval-source-map',
  output: {
    path: process.cwd()+'/',
    filename: 'whatkey.dist.js',
    libraryTarget: 'umd'
  }
};
