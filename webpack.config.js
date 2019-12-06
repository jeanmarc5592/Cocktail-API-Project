const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const multi = require('multi-loader');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html'  
        })
    ],
    module: {
        rules: [
            {   // Tests all files which end with .js, the js-files in node-modules excluded, and apply the babel-loader on them
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: {
                    loader: multi('style-loader!css-loader!sass-loader')
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ],
            },
        ],
    },
};

