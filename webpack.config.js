const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

var babelOptions = {
  "presets": [
    "react",
    [
      "es2015",
      {
        "modules": false
      }
    ],
    "es2016"
  ]
};

module.exports = {
    cache: true,
    entry: {
      main: "./src/swap.tsx",
      vendor: [
        'babel-polyfill',
        'events',
        'fbemitter',
        'flux',
        'react',
        'react-dom'
      ]
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/app/assets/javascripts",
        chunkFilename: '[chunkhash].js'
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules')
        ]
    },
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      }]
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
};
