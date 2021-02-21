const path = require('path')
const cssPlugin = require('mini-css-extract-plugin')
const dotenv=require('dotenv-webpack')
//const htmlPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        'render': './client/render.js',
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, './dist/statics'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [cssPlugin.loader, 'css-loader']
        },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name:'[name].[ext]',
                        outputPath:'images',
                        publicPath:'/statics/images'
                    }
                }]
            }
        ]
    },
    ////////////////////
    //optimization: {
    //    splitChunks: {
    //        chunks: 'all',
    //    },
    //},
    /////////////////////
    plugins: [
        new cssPlugin({ filename: '[name].css' }),
        new dotenv()
    ]
}