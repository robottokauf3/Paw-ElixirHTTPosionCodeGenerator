import path from 'path';

const name = 'ElixirHTTPoisonCodeGenerator.js';
const identifier = 'me.rok3.PawExtensions.ElixirHTTPoisonCodeGenerator';

const config = {
  entry: path.join(__dirname, './src', name),
  output: {
    path: path.join(__dirname, './build', identifier),
    filename: name
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
};

module.exports = config;
