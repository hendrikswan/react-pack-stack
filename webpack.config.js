var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    main: [
     'webpack-dev-server/client?http://localhost:8080',
     'webpack/hot/only-dev-server',
      './components/main.js'
    ]
  },
  output: {
    filename: './public/main.js',
    publicPath: 'http://localhost:8080/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      }
    ]
  }
}