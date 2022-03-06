const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const PORT = 3000;

module.exports = (env, arg) => {
  return {
    entry: path.resolve(__dirname, "./src/index.js"),
    devServer: {
      port: PORT,
      static: {
        directory: path.join(__dirname, "../public"),
      },
    },
    output: {
      path: path.resolve(
        __dirname,
        `../${arg.mode === "development" ? "public" : "dist"}`
      ),
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack", "url-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "main_contents",
        filename: "remoteEntry.js",
        remotes: {
          header_app: "header_app@header/remoteEntry.js",
          footer_app: "footer_app@footer/remoteEntry.js",
        },
        shared: {
          react: {
            requiredVersion: deps.react,
            singleton: true,
          },
          "react-dom": {
            requiredVersion: deps["react-dom"],
            singleton: true,
          },
        },
      }),
      new HtmlWebpackPlugin({
        manifest: "../public/manifest.json",
        favicon: "../public/favicon.ico",
        template: "../public/index.html",
      }),
    ],
  };
};
