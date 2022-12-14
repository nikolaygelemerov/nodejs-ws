/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const alias = {
  '@constants': path.resolve(__dirname, 'constants'),
  '@types': path.resolve(__dirname, 'types')
};

const extensions = ['.ts', '.js'];

const tsRule = {
  exclude: /node_modules/,
  test: /\.ts$/,
  use: {
    loader: 'babel-loader'
  }
};

const devServer = {
  client: {
    logging: 'error',
    overlay: true
  },
  compress: true,
  historyApiFallback: {
    index: 'http://localhost:8080'
  },
  hot: true,
  open: true
};

module.exports = {
  alias,
  devServer,
  extensions,
  tsRule
};
