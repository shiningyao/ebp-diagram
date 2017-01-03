/**
 * Created by yaoshining on 2016/11/27.
 */
'use strict';

var path = require('path');
const webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function(_path) {
    return {
        entry: {
            vendor: path.join(_path, '/app/src/index.vendor.ts'),
            'ebp-diagram': path.join(_path, '/app/src/diagram/diagram.module.ts'),
            app: path.join(_path, '/app/src/index.bootstrap.ts')
        },
        context: _path,
        output: {
            path: 'dist',
            publicPath: '/',
            filename: '[name].js'
        },

        devServer: {
            outputPath: path.join(_path, 'dist')
        },
        plugins: [
            new CleanWebpackPlugin(['dist'], {
                root: _path,
                verbose: true,
                dry: false
            }),
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false
            //     },
            //     sourceMap: true
            // }),
            new webpack.LoaderOptionsPlugin({
                debug: false,
                minimize: true
            })
        ]
    };
};