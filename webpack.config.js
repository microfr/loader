const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const IS_DEV = process.env.NODE_ENV === "development";

console.log(path.resolve(__dirname, "..", "server", "./node_modules/react"));
const externals = {
  react: 'commonjs react',
  "prop-types": {
    root: "PropTypes",
    commonjs2: "prop-types",
    commonjs: "prop-types",
    amd: "prop-types",
    umd: "prop-types"
  },
  graphql: "graphql",
  "@apollo/react-hooks": "@apollo/react-hooks",
  "apollo-boost": "apollo-boost"
};

let webpackConfig = {
  entry: IS_DEV ? "./Example.tsx" : "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    // alias: {
    //   react: path.resolve(__dirname, "./node_modules/react"),
    //   "react-dom": path.resolve(__dirname, "./node_modules/react-dom")
    // }
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },

      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "scoped-css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    IS_DEV &&
      new HtmlWebpackPlugin({
        template: "./index.html"
      })
  ].filter(x => x)
};

if (!IS_DEV) {
  webpackConfig = {
    ...webpackConfig,
    externals
  };
}

module.exports = webpackConfig;
