/**
 * Created by yaoshining on 2016/11/27.
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

const NODE_DEV = process.env.NODE_ENV || 'production';
const DEVELOPMENT = NODE_DEV === 'production'? false : true;
const sassLoader = 'css-loader?sourceMap!postcss-loader!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true';

module.exports = function(_path) {

    const config = {

        output: {
            path: path.join(_path, 'dist'),
            filename: '[name].js',
            library: 'ebp-diagram',
            libraryTarget: 'umd'
        },

        externals: [{
            angular: true
        }],

        resolve: {
            extensions: ['.ts', '.js']
        },

        module: {
            rules: [{
                test: /\.tpl.html$/,
                loader: 'html-loader'
            }, {
                test: /\.(ts|tsx)$/,
                exclude: [
                    path.resolve(_path, 'node_modules')
                ],
                loader: 'ts-loader',
                query: {
                    cacheDirectory: true
                }
            }, {
                test: /\.(scss|sass)$/,
                loader: DEVELOPMENT ? ('style-loader!' + sassLoader) : ExtractTextPlugin.extract(sassLoader)
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]'
            }, {
                test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [
                    "url-loader?name=assets/fonts/[name]_[hash].[ext]"
                ]
            }]
        },

        plugins: [
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: ['vendor']
            // }),
            new ExtractTextPlugin({
                filename: 'assets/styles/[name]' + (DEVELOPMENT ? '' : '') + '.css',
                allChunks: true
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(_path, 'app', 'index.html')
            }),
            new ngAnnotatePlugin({
                add: true
            })
        ]

    };

    return config;

};