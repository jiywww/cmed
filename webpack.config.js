const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // set the mode to development
  mode: 'development',

  // entry file of electron app
  entry: './src/main/main.ts',

  // output file for main process
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },

  // node_modules are not bundled
  externals: [nodeExternals()],

  // 
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  // 
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  // plugins configuration
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/renderer', to: 'renderer' },
        
      ],
    }),
  ],

  // 
  target: 'electron-main',

  // 
  devtool: 'source-map',
};
