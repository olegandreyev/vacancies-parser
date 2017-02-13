require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;

const config = {
    plugins :[
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.EnvironmentPlugin([
            "NODE_ENV"
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
    context:path.join(__dirname,'src'),
    entry: [
        'webpack-hot-middleware/client?reload=true&overlay=true',
        "./main.js",
    ],
    output: {
        filename: 'bundle.js',
        path:path.join(__dirname,'server','public'),
    },
    devtool:'#source-map',
    module:{
        rules:[
            {
                test:/\.less$|\.css$/,
                use: NODE_ENV !== 'DEV' ?
                    ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader',
                        'less-loader',
                    ]
                }) :
                    [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                    ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'file'
            },
            {
                test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                loader: 'file'
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    }
};

if(NODE_ENV){
    config.plugins.push(new ExtractTextPlugin('style.css'))
}

module.exports = config;