const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = path.join(__dirname, '..', 'src');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    index: path.join(srcDir, 'index.tsx'),
    background: path.join(srcDir, 'background.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks(chunk) {
        return chunk.name !== 'background';
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '../', context: 'public' }],
      options: {},
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
};
