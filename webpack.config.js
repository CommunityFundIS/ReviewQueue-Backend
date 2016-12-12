module.exports = {
  entry: './routes.js',
  target: 'node',
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: __dirname,
      exclude: /node_modules/,
    },{
      test: /\.json?$/,
      loader: 'json'
    }]
  }
}
