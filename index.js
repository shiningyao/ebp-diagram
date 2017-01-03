/**
 * Created by yaoshining on 2016/12/29.
 */
const ENV = process.env.NODE_ENV;

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const port = 3000;
const app = express('app');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./server.config');

const compiler = webpack(webpackConfig);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.engine('html', require('ejs').renderFile);

if(ENV !== 'production') {
    app.use(webpackDevMiddleware(compiler, {

    }));

    const hotMiddleware = require("webpack-hot-middleware")(compiler);

    app.use(hotMiddleware);

    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({ action: 'reload' });
            cb();
        })
    });

}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', api);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});