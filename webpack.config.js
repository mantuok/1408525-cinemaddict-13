'use strict';

const path = require('path');
const pathResolved = path.resolve(__dirname, 'public');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: pathResolved,
  },
  devtool: 'source-map',
  devServer: {
    contentBase: pathResolved,
    watchContentBase: true,
  }
};
