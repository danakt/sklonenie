const path    = require('path')
const webpack = require('webpack')

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            use: 'babel-loader',
        }],
    },
}
