const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve('./src/App.tsx'),

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      modals: path.resolve('./src/components/modals'),
      actions: path.resolve('./src/actions'),
      types: path.resolve('./src/types'),
      reducers: path.resolve('./src/reducers'),
      sagas: path.resolve('./src/sagas'),
      icons: path.resolve('./src/icons'),
      store: path.resolve('./src/store'),
      hooks: path.resolve('./src/hooks'),
      selectors: path.resolve('./src/selectors'),
      utils: path.resolve('./src/utils'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: 'static' }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
};
