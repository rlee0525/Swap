const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: "./src/swap.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/app/assets/javascripts"
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
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
};
