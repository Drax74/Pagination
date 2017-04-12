const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: [
      './assets/js/app.js',
      './assets/scss/app.scss'
    ]
  },
  output: {
    filename: './dist/app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test:/\.handlebars$/,
        loader: "handlebars-loader"
      },
      {
      test:/\.scss$/,
      use: ExtractTextPlugin.extract({
        use: ["css-loader", "sass-loader"],
        fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./dist/style.css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}
