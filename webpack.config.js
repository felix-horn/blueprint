import { resolve, sep } from 'node:path';

import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { createTransformer } from 'typescript-plugin-styled-components';

const styledComponentsTransformer = createTransformer();

export const dirBase = process.cwd();

export const dirDist = resolve(dirBase, 'dist');
export const dirSrc = resolve(dirBase, 'src');
export const dirStatic = resolve(dirBase, 'static');

/**
 * @typedef ConfigurationExtended
 * @type {import('webpack').Configuration & { devServer?: import('webpack-dev-server').Configuration }}
 */

/** @type {ConfigurationExtended} */
export default {
  devServer: {
    compress: true,
    port: 3000,
    static: [
      {
        directory: dirSrc,
        publicPath: `${sep}src`,
      },
      {
        directory: dirStatic,
      },
    ],
  },
  devtool: 'nosources-source-map',
  entry: resolve(dirSrc, 'main.tsx'),
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve(dirBase, 'tsconfig.build.json'),
              // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  output: {
    clean: true,
    devtoolModuleFilenameTemplate: '[resource-path]',
    filename: '[name].[contenthash].js',
    path: dirDist,
  },
  performance: false,
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      // template: resolve(dirSrc, 'index.html'),
      title: 'boilerplate-dom',
    }),
  ],
  resolve: {
    extensionAlias: {
      '.js': ['.ts', '.tsx', '.js'],
      '.mjs': ['.mts', '.mjs'],
    },
  },
};
