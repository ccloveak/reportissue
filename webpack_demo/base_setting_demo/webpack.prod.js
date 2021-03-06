"use strict";

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: { index: "./src/index.js", search: "./src/search.js" },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegex: /\.css$/g,
      cssProcessor: require("cssnano"),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/index.html`),
      filename: `index.html`,
      chunks: ["index"],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/search.html`),
      filename: `search.html`,
      chunks: ["search"],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /.js$/,
        use: ["babel-loader"],
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.png$|\.jpg$|\.gif$|\.jpeg$/,
        use: [
          { loader: "file-loader", options: { name: "[name]_[hash:8].[ext]" } },
        ],
      },
      {
        test: /\.woff$|\.otf$|\.woff2$|\.eot$|\.ttf$/,
        use: [
          { loader: "file-loader", options: { name: "[name]_[hash:8].[ext]" } },
        ],
      },
    ],
  },
};
