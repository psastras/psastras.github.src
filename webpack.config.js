var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const prod = 'production';
const dev = 'development';

const TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? prod : dev;
const isDev = TARGET_ENV == dev;
const isProd = TARGET_ENV == prod;

const baseConfig = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },

  resolve: {
    extensions: ['.js', '.elm']
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|jpg)$/,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /Stylesheets\.elm$/,
        use: [
          'style-loader',
          'css-loader',
          'elm-css-webpack-loader'
        ]
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/img/',
      to: 'img/'
    }])
  ],

  target: 'web'
};

if (isDev) {
  module.exports = merge(baseConfig, {
    module: {
      rules: [
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/, /Stylesheets\.elm/],
          use: [
            'elm-hot-loader',
            {
              loader: 'elm-webpack-loader',
              options: {
                debug: true
              }
            }
          ]
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      overlay: true,
      inline: true
    }
  })
}

if (isProd) {
  module.exports = merge(baseConfig, {
    module: {
      rules: [
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/, /Stylesheets\.elm/],
          use: [
            'elm-webpack-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compressor: {
          warnings: false
        },
        mangle: true
      })
    ]
  })
}