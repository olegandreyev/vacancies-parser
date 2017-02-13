require('dotenv').config();
const webpack = require('webpack');
const path = require('path');

module.exports = {
    plugins :[
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.EnvironmentPlugin([
            "NODE_ENV"
        ]),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
    context:path.join(__dirname,'src'),
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path:path.join(__dirname,'server','public'),
    },
    devtool:'cheap-source-map',
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
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
                loader: "babel-loader", // Do not use "use" here
                options: {
                   presets:['es2015','react','stage-0']
                }
            }
        ]
    }
};