const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtract =require('mini-css-extract-plugin');
const opticss =require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports={

    mode: 'production',
    optimization:{
        minimizer:[
            new opticss()
        ]
    },output:{
        filename: 'main.[contentHash].js'
    },
    module: {
        rules:[
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
              test:  /\.css$/i,
              exclude:  /style\.css$/i,
              use:[
                  'style-loader',
                  'css-loader'
              ]
            },
            {
              test:  /style\.css$/i,
              use:[
                   MiniCssExtract.loader,
                  'css-loader'
              ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options:{
                    attributes:false,
                    minimize: false, 
                },
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:'./src/index.html',
            filename:'./index.html'
        }),
        new MiniCssExtract({
            filename: '[name].[contentHash].css',
            ignoreOrder:false
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
    ]
}