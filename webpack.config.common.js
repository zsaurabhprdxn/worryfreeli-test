
const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const regenerator = require("regenerator-runtime/runtime");
var webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

module.exports = {
  // Our "entry" point
  entry: ["regenerator-runtime/runtime.js", "./main.js"],
  output: {
    library: 'SITE',
    path: path.resolve(__dirname, 'compiled-assets'),
  },
  module: {
    rules: [
      // Transpile and polyfill our JavaScript
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ],
  },
  // Any `import`s from `node_modules` will compiled in to a `vendor.js` file.
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }),
    new NodePolyfillPlugin(),
    new Dotenv()
  ],
};