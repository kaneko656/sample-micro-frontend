const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = (env, arg) => {
  return {
    output: {
      path: path.resolve(
        __dirname,
        `../${arg.mode === "development" ? "public" : "dist"}/footer`
      ),
      filename: "footer-[hash].js",
      chunkFilename: "footer-[chunkhash].bundle.js",
    },
    watch: arg.mode === "development",

    resolve: {
      extensions: [".tsx", ".ts", ".vue", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 8080,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.tsx?$/,
          use: [
            "babel-loader",
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                appendTsSuffixTo: ["\\.vue$"],
                happyPackMode: true,
              },
            },
          ],
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },

    plugins: [
      new VueLoaderPlugin(),
      new ModuleFederationPlugin({
        name: "footer_app",
        filename: "remoteEntry.js",
        exposes: {
          "./TheFooter": "./src/components/TheFooter.js",
        },
        shared: require("./package.json").dependencies,
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
