var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');
var autoprefixer = require('autoprefixer');
var src = 'src';
var dist = 'dist';
var cssLoader = 'css?sourceMap&-minimize';

if (process.env.NODE_ENV === 'production') {
  cssLoader = 'css?-sourceMap&minimize';
}

var config = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: path.join(__dirname, src, 'index.js'),
    vendor: ['vue']
  },
  output: {
    path: path.join(__dirname, dist),
    filename: '[name].[hash].js',
    pathinfo: true
  },
  resolve: {
    root: path.resolve(__dirname)
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
        exclude: /(node_modules|bower_components)/,
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          cacheDirectory: true
        }
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', cssLoader + '!postcss')
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', cssLoader + '!postcss!sass')
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }, {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']})],
  debug: true,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, src, 'index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: false
      }
    }),
    new CleanWebpackPlugin([path.join(__dirname, dist)]),
    new webpack.optimize.CommonsChunkPlugin({names: ['vendor']}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.BannerPlugin('This file is created by dding'),
    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: 'server',
      // Port that will be used by in `server` mode to start HTTP server.
      analyzerPort: 8888,
      // Path to bundle report file that will be generated in `static` mode.
      // If relative path is provided, it will be relative to bundles output directory
      reportFilename: 'report.html',
      // Automatically open report in default browser
      openAnalyzer: true,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: false,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: 'stats.json',
    })
  ],
  devServer: {
    inline: true,
    hot: true
  }
};

if (process.env.NODE_ENV === 'production') {
  config.output.filename = '[name].min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      unused: true,
      dead_code: true,
      warnings: false
    },
    sourceMap: false
  }));
}

module.exports = config;
