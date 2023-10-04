const path = require('path');

module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    fallback: {
      util: require.resolve('util/')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000
  }
};


module.exports = config;
