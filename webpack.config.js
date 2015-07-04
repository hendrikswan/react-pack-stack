module.exports = {
  entry: {
    main: [
     'webpack-dev-server/client?http://localhost:8080',
     'webpack/hot/only-dev-server',
      './components/main.js'
    ]
  },
  output: {
    filename: './public/main.js',
    publicPath: '/'
  }
}