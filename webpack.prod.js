const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
      {
        test: /\.css$/,
        exclude: /style.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /style.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "file-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinWebpackPlugin(), new TerserWebpackPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "My webpack app",
      //filename: "index.html", default index.html
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      //filename: "[name].[fullhash].css",
      filename: "[name].[fullhash].css",
      ignoreOrder: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets/images/",
          to: "assets/images",
        },
      ],
    }),
  ],
};
