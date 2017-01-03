/**
 * Created by yaoshining on 2016/11/27.
 */
const webpack = require('webpack');
const path = require('path');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = function(_path) {

    return {
        watch: true,
        entry: {
            vendor: [path.join(_path, '/app/src/index.vendor.ts'), hotMiddlewareScript],
            'ebp-diagram': [path.join(_path, '/app/src/diagram/diagram.module.ts'), hotMiddlewareScript],
            app: [path.join(_path, '/app/src/index.bootstrap.ts'), hotMiddlewareScript]
        },
        context: _path,
        devtool: 'cheap-source-map',
        output: {
            publicPath: 'http://127.0.0.1:3000/'
        },
        devServer: {
            contentBase: './dist',
            info: true,
            hot: true,
            inline: true,
            proxy: {
                '/*': {
                    target: 'http://114.215.109.39:8081',
                    secure: false,
                    changeOrigin: true
                }
            }
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: ['app', 'ebp-diagram', 'vendor']
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.LoaderOptionsPlugin({
                debug: true
            })
        ]
    };

};