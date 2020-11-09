const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
  .default;

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  mode: 'development',
  entry: path.resolve('./src/App.tsx'),

  devtool: 'inline-source-map',

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
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    hot: true,
    port: 7777,
  },
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
        options: {
          getCustomTransformers: () => ({
            before: [styledComponentsTransformer],
          }),
        },
      },
    ],
  },
};
