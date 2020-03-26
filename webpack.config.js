const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtract =require('mini-css-extract-plugin');
const opticss =require('optimize-css-assets-webpack-plugin');

module.exports={

    mode: 'development',
    optimization:{
        minimizer:[
            new opticss()
        ]
    },
    module: {
        rules:[
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
            filename: 'estilopro.[contentHash].css',
            ignoreOrder:false
        })
    ]
}