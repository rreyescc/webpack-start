const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "My webpack app",
      //filename: "index.html", default index.html
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      //filename: "[name].[fullhash].css",
      filename: "[name].css",
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
