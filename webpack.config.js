const path = require('path');

// css extraction and minification
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// clean out build dir in-between builds
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [
  {
    entry: {
      'main': [
        './src/js/main.js',
        './src/css/main.scss'  // Points to correct SCSS file
      ]
    },
    output: {
      filename: './js/build/[name].min.[fullhash].js',
      path: path.resolve(__dirname)
    },
    module: {
      rules: [
        // js babelization
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // css handling for .css files
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        // sass compilation
        {
          test: /\.(sass|scss)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        // loader for webfonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          include: path.resolve(__dirname, 'src/fonts'),  // Updated: Ensure fonts are sourced from src/fonts
          type: 'asset/resource',
          generator: {
            filename: './assets/fonts/[name][ext]',  // Output fonts to assets/fonts
          }
        },
        // loader for images and icons
        {
          test: /\.(png|jpg|gif)$/,
          type: 'asset/resource',
          generator: {
            filename: './assets/img/[name][ext]',
          }
        },
      ]
    },
    plugins: [
      // clear out build directories on each build
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          './js/build/*',
          './assets/styles/*',  
          './assets/fonts/*' 
        ]
      }),
      // css extraction into dedicated file
      new MiniCssExtractPlugin({
        filename: './assets/styles/main.min.[fullhash].css'
      }),
    ],
    optimization: {
      minimizer: [
        `...`,
        new CssMinimizerPlugin(),
      ]
    },
  }
];
